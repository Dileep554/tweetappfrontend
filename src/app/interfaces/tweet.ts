import { User } from './user';

export interface Tweet {
  id: string;
  tweetName:string;
  postDate: string;
  likes: number;
  user: User;
  replies: Tweet[];
  tweetTag: string;
}