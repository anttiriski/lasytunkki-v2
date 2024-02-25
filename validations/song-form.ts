import { z } from "zod";

export const songFormSchema = z.object({
  title: z
    .string()
    .min(1, "Laulun otsikon pitää olla yli 1 kirjain pitkä.")
    .max(200, "Laulun otsikko ei saa olla yli 200 kirjainta pitkä."),
  lyrics: z
    .string()
    .max(10000, "Laulun sanat eivät saa olla yli 10000 kirjainta pitkiä."),
  melody: z
    .string()
    .max(600, "Melodia ei saa olla yli 600 kirjainta pitkä.")
    .optional(),
  melody_link: z
    .string()
    .max(200, "Melodialinkki ei saa olla yli 200 kirjainta pitkä.")
    .optional(),
  language: z.enum(["finnish", "swedish", "english", "other"], {
    required_error: "Valitse laulun kieli.",
  }),
});
