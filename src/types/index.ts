import { z } from "zod";

export interface ICourse {
  id: number;
  title: string;
  lessonCount: number;
  timeToFinish: number;
  image: string;
  description: string;
  tech: string;
}

export const ROLES = ["user", "admin", "teacher"] as const;

export type UserRole = (typeof ROLES)[number];

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string | null;
  username: string | null;
  avatar: string;
  role: UserRole;
}

export const COURSE_CONTENT_TYPES = ["markdown"] as const;

export type ICourseContentTypes = (typeof COURSE_CONTENT_TYPES)[number];

export const QuizSchema = z.object({
  quest: z.string(),
  variants: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  answer: z.number().int().nonnegative(),
});

export type QuizType = z.infer<typeof QuizSchema>;
