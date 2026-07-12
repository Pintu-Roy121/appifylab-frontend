export interface Post {
  _id: string;
  author: IAuthor;
  text: string;
  image: string;
  visibility: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IPostLike {
  _id: string;
  user: IUser;
  post: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  email: string;
}
