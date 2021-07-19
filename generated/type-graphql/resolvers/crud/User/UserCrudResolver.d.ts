import { GraphQLResolveInfo } from "graphql";
import { AggregateUserArgs } from "./args/AggregateUserArgs";
import { CreateUserArgs } from "./args/CreateUserArgs";
import { DeleteManyUserArgs } from "./args/DeleteManyUserArgs";
import { DeleteUserArgs } from "./args/DeleteUserArgs";
import { FindFirstUserArgs } from "./args/FindFirstUserArgs";
import { FindManyUserArgs } from "./args/FindManyUserArgs";
import { FindUniqueUserArgs } from "./args/FindUniqueUserArgs";
import { GroupByUserArgs } from "./args/GroupByUserArgs";
import { UpdateManyUserArgs } from "./args/UpdateManyUserArgs";
import { UpdateUserArgs } from "./args/UpdateUserArgs";
import { UpsertUserArgs } from "./args/UpsertUserArgs";
import { User } from "../../../models/User";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateUser } from "../../outputs/AggregateUser";
import { UserGroupBy } from "../../outputs/UserGroupBy";
export declare class UserCrudResolver {
    user(ctx: any, info: GraphQLResolveInfo, args: FindUniqueUserArgs): Promise<User | null>;
    findFirstUser(ctx: any, info: GraphQLResolveInfo, args: FindFirstUserArgs): Promise<User | null>;
    users(ctx: any, info: GraphQLResolveInfo, args: FindManyUserArgs): Promise<User[]>;
    createUser(ctx: any, info: GraphQLResolveInfo, args: CreateUserArgs): Promise<User>;
    deleteUser(ctx: any, info: GraphQLResolveInfo, args: DeleteUserArgs): Promise<User | null>;
    updateUser(ctx: any, info: GraphQLResolveInfo, args: UpdateUserArgs): Promise<User | null>;
    deleteManyUser(ctx: any, info: GraphQLResolveInfo, args: DeleteManyUserArgs): Promise<AffectedRowsOutput>;
    updateManyUser(ctx: any, info: GraphQLResolveInfo, args: UpdateManyUserArgs): Promise<AffectedRowsOutput>;
    upsertUser(ctx: any, info: GraphQLResolveInfo, args: UpsertUserArgs): Promise<User>;
    aggregateUser(ctx: any, info: GraphQLResolveInfo, args: AggregateUserArgs): Promise<AggregateUser>;
    groupByUser(ctx: any, info: GraphQLResolveInfo, args: GroupByUserArgs): Promise<UserGroupBy[]>;
}
