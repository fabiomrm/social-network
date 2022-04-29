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

export type Comment = {
  id: number;
  text: string;
  userId: number;
  postId: number;
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
  comments?: Comment[];
  likes?: Like[];
};

export type Like = {
  id: number;
  postId: number | null;
  commentId: number | null;
  userId: number;
  createdAt: Date;
};
