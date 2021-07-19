import { UserCreateNestedOneWithoutPostsInput } from "../inputs/UserCreateNestedOneWithoutPostsInput";
export declare class PostCreateInput {
    createdAt?: Date | undefined;
    title: string;
    published?: boolean | undefined;
    author: UserCreateNestedOneWithoutPostsInput;
}
