import { COURSE_CONTENT_TYPES } from "@/types";
import { z } from "zod";

export const courseFormSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Name must be at least 3 characters" })
    .max(50, { error: "Name must be at most 50 characters" }),
  language: z
    .string()
    .min(1, { error: "Language must be at least 1 character" }),
  type: z.literal(COURSE_CONTENT_TYPES),
  desc: z.string().min(1, "Markdown is required"),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;
