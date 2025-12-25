import { z } from "zod";
import { CONTENT_TYPES } from "./constants";

const BaseSchema = z.object({
  name: z.string().min(3).max(50),
  language: z.string().min(1),
});

export const courseFormSchema = z.discriminatedUnion("type", [
  BaseSchema.extend({
    type: z.literal(CONTENT_TYPES.MARKDOWN),
    content: z.string().min(1, "Markdown is required"),
  }),
]);

export type CourseFormValues = z.infer<typeof courseFormSchema>;
