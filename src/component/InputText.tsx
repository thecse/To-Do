import React, { useContext, useState } from "react";
import { TaskDataContext } from "../context/TaskDataContext";
import { EditInputTextProps } from "../Interface/TypeDef";
import { toDoKey } from "../util/UtilFunction";

export const InputText = () => {
    
    const [value, setValue] = useState("");
    const {addingTask, setAddingTask, taskList, setTaskList} = useContext(TaskDataContext);
    if(addingTask)
        return (
            <>
                <input type="text" value={value} className="full-width" onChange={(event) => setValue(event.target.value) }/>
                <button onClick={() => {
                    if(value.length !== 0) {
                        setTaskList([...taskList, {checked: false, value: value, display:true}]);
                    }
                    setValue("");
                    setAddingTask(false)
                }}>Save</button>
                <button onClick={() => {
                    setAddingTask(false)
                }}>Cancel</button>
            </>
        )
    else return <></>
}

export const EditInputText: React.FC<EditInputTextProps> = (props) => {
    const {index, edit, setEdit} = props;
    const {taskList, setTaskList, date} = useContext(TaskDataContext);
    const [value, setValue] = useState<string>(taskList[index].value)
    return (
        <div>
            <input type="text" value={value} className="full-width" onChange={(event) => setValue(event.target.value) }/>
            <button onClick={() => {
                if(value.length === 0) {
                    const updatedElement = [...taskList.slice(0, index), ...taskList.slice(index + 1)];
                    if(updatedElement.length === 0) {
                        localStorage.setItem(toDoKey(date), JSON.stringify(updatedElement))
                    }
                    setTaskList(updatedElement);
                } else {
                    const updatedItem = [...taskList];
                    updatedItem[index] = {...updatedItem[index], value: value}
                    setTaskList(updatedItem);
                }
                setEdit({...edit, [index]:false});
            }}>Save</button>
            <button onClick={() => {
                setEdit({...edit, [index]:false})
            }}>Cancel</button>
        </div>
    )
}