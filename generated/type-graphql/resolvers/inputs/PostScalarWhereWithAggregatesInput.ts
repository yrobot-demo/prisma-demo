import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../prisma-client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class PostScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [PostScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: PostScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: PostScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: PostScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  title?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => BoolWithAggregatesFilter, {
    nullable: true
  })
  published?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  authorId?: IntWithAggregatesFilter | undefined;
}
