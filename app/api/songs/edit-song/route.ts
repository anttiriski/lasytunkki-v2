var slugify = require("slugify");

import { getAdminSupabase } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import { songFormSchema } from "@/validations/song-form";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  const supabase = createServerClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return Response.json({ error: "not-authenticated" });
  }

  const { title, lyrics, melody, melody_link, language, slug } =
    await request.json();

  const inputValidation = songFormSchema.safeParse({
    title,
    lyrics,
    melody,
    melody_link,
    language,
  });

  if (!inputValidation.success) {
    return Response.json({ error: "validation-error" });
  }

  // Check that song with slug exists
  const { error: slugError } = await supabase
    .from("songs_v2")
    .select("id")
    .eq("slug", slug)
    .single();

  if (slugError) {
    throw new Error("song-not-found");
  }

  const adminSupabase = getAdminSupabase();

  const { error } = await adminSupabase
    .from("songs_v2")
    .update({
      title,
      lyrics,
      melody,
      melody_link,
      language,
    })
    .eq("slug", slug);

  if (error) {
    throw new Error("server-error");
  }

  revalidatePath(`/laulut/${slug}`);

  return Response.json({ success: true, slug });
};
