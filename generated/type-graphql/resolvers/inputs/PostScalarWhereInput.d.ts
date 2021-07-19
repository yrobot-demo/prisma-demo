import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
export declare class PostScalarWhereInput {
    AND?: PostScalarWhereInput[] | undefined;
    OR?: PostScalarWhereInput[] | undefined;
    NOT?: PostScalarWhereInput[] | undefined;
    id?: IntFilter | undefined;
    createdAt?: DateTimeFilter | undefined;
    title?: StringFilter | undefined;
    published?: BoolFilter | undefined;
    authorId?: IntFilter | undefined;
}
