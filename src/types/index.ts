export interface ICourse {
  id: number;
  title: string;
  lessonCount: number;
  timeToFinish: number;
  image: string;
  description: string;
  tech: string;
}
// export interface FCourse {
//   name: string;
//   content: string;
//   type: string; //(select)
//   language: string;
//   description: string;
// }

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
  username: string | null;
  avatar: string;
}

export const COURSE_CONTENT_TYPES = ["markdown", "quiz-test"] as const;

export type ICourseContentTypes = (typeof COURSE_CONTENT_TYPES)[number];

export interface IQuizTypes {
  quest: string;
  variants: { value: string }[];
  answer: number;
}
