import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutPostsInput } from "../inputs/UserUpdateOneRequiredWithoutPostsInput";
export declare class PostUpdateInput {
    createdAt?: DateTimeFieldUpdateOperationsInput | undefined;
    title?: StringFieldUpdateOperationsInput | undefined;
    published?: BoolFieldUpdateOperationsInput | undefined;
    author?: UserUpdateOneRequiredWithoutPostsInput | undefined;
}
