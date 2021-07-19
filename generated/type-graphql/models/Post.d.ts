import { User } from "../models/User";
export declare class Post {
    id: number;
    createdAt: Date;
    title: string;
    published: boolean;
    author?: User;
    authorId: number;
}
