import { User } from "./user";

export interface userResponse{
    user:User;
    loginStatus:string;
    token?:string;
}