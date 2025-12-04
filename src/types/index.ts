export interface ICourse {
  id: number;
  title: string;
  lessonCount: number;
  timeToFinish: number;
  image: string;
  description: string;
  tech: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
  username: string | null;
  avatar: string;
}
