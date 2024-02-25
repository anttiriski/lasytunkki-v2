"use client";

import BackButton from "@/components/BackButton";
import ButtonLoading from "@/components/LoadingButton";
import { Song } from "@/components/SongList";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Space from "@/components/ui/space";
import { Textarea } from "@/components/ui/textarea";
import { POST } from "@/lib/fetch-helpers";
import { songFormSchema } from "@/validations/song-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditSongPageProps {
  song: Song;
}

const EditSongPage: React.FC<EditSongPageProps> = ({ song }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof songFormSchema>>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: song.title,
      lyrics: song.lyrics,
      melody: song.melody ?? "",
      melody_link: song.melody_link ?? "",
      language: song.language ?? "finnish",
    },
  });

  const onSubmit = async (values: z.infer<typeof songFormSchema>) => {
    try {
      setLoading(true);

      const body = {
        ...values,
        slug: song.slug,
      };

      const response = await POST("/api/songs/edit-song", body);

      toast.success("Laulu muokattu onnistuneesti!");

      router.push(`/laulut/${response.slug}`);
    } catch (error) {
      toast.error("Laulun muokkaaminen epäonnistui.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BackButton />

      <Space className="mt-4" />

      <h1 className="font-semibold text-xl">Muokkaa kappaletta</h1>

      <Space className="mt-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Laulun nimi</FormLabel>
                <FormControl>
                  <Input placeholder="Hauki ja muita ihmeitä" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="melody"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melodia</FormLabel>
                <FormControl>
                  <Input
                    className="italic"
                    placeholder="Stenka Razin, Venäjä trad. "
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="melody_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melodian linkki</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormDescription>
                  Lisää linkki kappaleen melodiaan halutessasi. Näin käyttäjät
                  voivat kuunnella kappaleen melodian helpommin.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sanat</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Katonrajass' kulkee hauki..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Laulun kieli</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="finnish" defaultChecked />
                      </FormControl>

                      <FormLabel className="font-normal">Suomi</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="swedish" />
                      </FormControl>

                      <FormLabel className="font-normal">Ruotsi</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="english" />
                      </FormControl>

                      <FormLabel className="font-normal">Englanti</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>

                      <FormLabel className="font-normal">Muu</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loading ? (
            <ButtonLoading>Tallenna muutokset</ButtonLoading>
          ) : (
            <Button type="submit">Tallenna muutokset</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EditSongPage;
