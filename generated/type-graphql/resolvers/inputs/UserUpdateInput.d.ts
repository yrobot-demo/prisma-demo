import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { PostUpdateManyWithoutAuthorInput } from "../inputs/PostUpdateManyWithoutAuthorInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
export declare class UserUpdateInput {
    email?: StringFieldUpdateOperationsInput | undefined;
    name?: NullableStringFieldUpdateOperationsInput | undefined;
    password?: NullableStringFieldUpdateOperationsInput | undefined;
    posts?: PostUpdateManyWithoutAuthorInput | undefined;
}
