export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  birthdate: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = {
  id: number;
  text: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  comments: Comment[];
};
