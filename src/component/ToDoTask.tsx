import React, { useContext, useState } from "react";
import { TaskDataContext } from "../context/TaskDataContext";
import { toDoKey } from "../util/UtilFunction";
import { EditInputText } from "./InputText";
import { BooleanMap, Task } from "../Interface/TypeDef";

export const ToDoTask = () => {
    const {taskList, setTaskList, searchQuery, date} = useContext(TaskDataContext);
    const [edit, setEdit] = useState<BooleanMap>({});
    return (
        <div className="task-body">
            {taskList.map((element:Task, index:number) => {
                if(!element.display) {
                    return <></>
                }
                let searchIndex = -1;
                let before="", highligted="", after=element.value;
                if(searchQuery !== "") {
                    searchIndex = element.value.toLowerCase().indexOf(searchQuery.toLowerCase())
                    if(searchIndex === -1) {
                        return <></>
                    } else {
                        before = element.value.substring(0, searchIndex)
                        highligted = element.value.substring(searchIndex, searchIndex + searchQuery.length)
                        after = element.value.substring(searchIndex + searchQuery.length)
                    }
                }
                if(edit[index]) {
                    return <EditInputText index={index} edit={edit} setEdit={setEdit} />
                }
                return (
                    <div className={element.checked ? "task-container completed" : "task-container incompleted"}>
                        <div className="task-text">
                            <input type="checkbox" checked={element
                            .checked} onClick={() => {
                                const updatedElement = [...taskList];
                                updatedElement[index] = {...updatedElement[index], checked:!element.checked}
                                setTaskList(updatedElement);
                            }}/>
                            <div>
                                {before}
                                <mark style={{ backgroundColor: 'black', color: 'white' }}>{highligted}</mark>
                                {after}
                            </div>
                        </div>
                        <div className="task-button">
                            <button onClick={() => {
                            const updatedElement = [...taskList.slice(0, index), ...taskList.slice(index + 1)];
                            if(updatedElement.length === 0) {
                                localStorage.setItem(toDoKey(date), JSON.stringify(updatedElement))
                            }
                            setTaskList(updatedElement);
                            }}>Remove</button>
                            <button onClick={()=>setEdit({...edit, [index]:true})}>Edit</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}