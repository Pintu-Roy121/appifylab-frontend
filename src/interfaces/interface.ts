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

export interface IComment {
  _id: string;
  user: IUser;
  post: string;
  text: string;
  likeCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
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
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
}

export interface IComments {
  _id: string;
  user: IUser;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
