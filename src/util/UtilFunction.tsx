import { FILTER_KEY, TO_DO_KEY_SUFFIX } from "../constant/KeyConstants";
import { Task } from "../Interface/TypeDef";

export const getDateString = (date:Date) => {
    return date.toISOString().split("T")[0]
};

export const toDoKey = (date: string) => {
    return date + TO_DO_KEY_SUFFIX;
};

export const filterKey = (date: string) => {
    return date + FILTER_KEY;
}
