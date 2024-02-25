"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { POST } from "@/lib/fetch-helpers";
import { songFormSchema } from "@/validations/song-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonLoading from "@/components/LoadingButton";

const NewSongForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof songFormSchema>>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: "",
      lyrics: "",
      melody: "",
      melody_link: "",
      language: "finnish",
    },
  });

  const onSubmit = async (values: z.infer<typeof songFormSchema>) => {
    try {
      setLoading(true);
      const response = await POST("/api/songs/add-song", values);

      toast.success("Laulu lisätty onnistuneesti!");

      router.push(`/laulut/${response.slug}`);
    } catch (error) {
      toast.error("Laulun lisääminen epäonnistui.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          disabled={!form.formState.dirtyFields.melody}
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
          <ButtonLoading>Lisää laulu</ButtonLoading>
        ) : (
          <Button type="submit">Lisää laulu</Button>
        )}
      </form>
    </Form>
  );
};

export default NewSongForm;
