export type StringOrNull = string | null;

export type BooleanMap = {
    [key:number]: boolean
}
export type Task = {
    checked: boolean;
    display: boolean;
    value: string;
}

export type EditInputTextProps = {
    index: number;
    edit: BooleanMap;
    setEdit: React.Dispatch<React.SetStateAction<BooleanMap>>;
};