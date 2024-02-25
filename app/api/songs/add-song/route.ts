var slugify = require("slugify");

import { createServerClient } from "@/lib/supabase/server";
import { songFormSchema } from "@/validations/song-form";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "not-authenticated" });
  }

  const inputValidation = songFormSchema.safeParse(await request.json());

  if (!inputValidation.success) {
    return Response.json({ error: "validation-error" });
  }

  const { title, lyrics, melody, melody_link, language } = inputValidation.data;

  const slug = slugify(title, { lower: true });

  const { error } = await supabase.from("songs_v2").insert({
    title,
    lyrics,
    melody,
    melody_link,
    language,
    slug,
  });

  if (error) {
    // Duplicate slug error
    if (error.code === "23505") {
      const slug = slugify(
        title + "-" + Math.random().toString(36).substring(9),
        { lower: true }
      );

      const { error } = await supabase.from("songs_v2").insert({
        title,
        lyrics,
        melody,
        melody_link,
        language,
        slug,
      });

      if (error) {
        throw new Error("server-error");
      }

      return Response.json({ success: true, slug });
    }

    throw new Error("server-error");
  }

  revalidatePath("/laulut/" + slug);
  revalidatePath("/tunkki");
  revalidatePath("/");

  return Response.json({ success: true, slug });
};
