import { GraphQLResolveInfo } from "graphql";
import { AggregatePostArgs } from "./args/AggregatePostArgs";
import { CreatePostArgs } from "./args/CreatePostArgs";
import { DeleteManyPostArgs } from "./args/DeleteManyPostArgs";
import { DeletePostArgs } from "./args/DeletePostArgs";
import { FindFirstPostArgs } from "./args/FindFirstPostArgs";
import { FindManyPostArgs } from "./args/FindManyPostArgs";
import { FindUniquePostArgs } from "./args/FindUniquePostArgs";
import { GroupByPostArgs } from "./args/GroupByPostArgs";
import { UpdateManyPostArgs } from "./args/UpdateManyPostArgs";
import { UpdatePostArgs } from "./args/UpdatePostArgs";
import { UpsertPostArgs } from "./args/UpsertPostArgs";
import { Post } from "../../../models/Post";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregatePost } from "../../outputs/AggregatePost";
import { PostGroupBy } from "../../outputs/PostGroupBy";
export declare class PostCrudResolver {
    post(ctx: any, info: GraphQLResolveInfo, args: FindUniquePostArgs): Promise<Post | null>;
    findFirstPost(ctx: any, info: GraphQLResolveInfo, args: FindFirstPostArgs): Promise<Post | null>;
    posts(ctx: any, info: GraphQLResolveInfo, args: FindManyPostArgs): Promise<Post[]>;
    createPost(ctx: any, info: GraphQLResolveInfo, args: CreatePostArgs): Promise<Post>;
    deletePost(ctx: any, info: GraphQLResolveInfo, args: DeletePostArgs): Promise<Post | null>;
    updatePost(ctx: any, info: GraphQLResolveInfo, args: UpdatePostArgs): Promise<Post | null>;
    deleteManyPost(ctx: any, info: GraphQLResolveInfo, args: DeleteManyPostArgs): Promise<AffectedRowsOutput>;
    updateManyPost(ctx: any, info: GraphQLResolveInfo, args: UpdateManyPostArgs): Promise<AffectedRowsOutput>;
    upsertPost(ctx: any, info: GraphQLResolveInfo, args: UpsertPostArgs): Promise<Post>;
    aggregatePost(ctx: any, info: GraphQLResolveInfo, args: AggregatePostArgs): Promise<AggregatePost>;
    groupByPost(ctx: any, info: GraphQLResolveInfo, args: GroupByPostArgs): Promise<PostGroupBy[]>;
}
