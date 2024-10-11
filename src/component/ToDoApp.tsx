import React, { useEffect, useState } from "react";
import '../Style.css';
import { InputText } from "./InputText";
import { TaskDataContext } from "../context/TaskDataContext";
import { ToDoTask } from "./ToDoTask";
import { AddTask } from "./AddTask";
import { DateSetter } from "./DateSetter";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { getDateString, toDoKey } from "../util/UtilFunction";
import { Task } from "../Interface/TypeDef";
import { StringOrNull } from "../Interface/TypeDef";

export const ToDoApp = () => {

    const [taskList, setTaskList] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [addingTask, setAddingTask] = useState<boolean>(false);
    const [date, setDate] = useState<string>(getDateString(new Date()))

    useEffect(() => {
        let jsonString:StringOrNull = localStorage.getItem(toDoKey(date))
        if(jsonString == null) {
            setTaskList([]);
        } else {
            setTaskList(JSON.parse(jsonString))
        }
    }, [date])

    useEffect(() => {
        if(taskList.length > 0){
            localStorage.setItem(toDoKey(date), JSON.stringify(taskList));
        }
    }, [taskList])

    return (
        <TaskDataContext.Provider value={{addingTask, setAddingTask, taskList, setTaskList, 
        searchQuery, setSearchQuery, date, setDate}}>
            <div className="to-do">
                <div className="to-do-header">
                    <DateSetter/>
                    <Filter/>
                    <Search/>
                </div>
                <div className="to-do-body">
                    <ToDoTask/>
                    <InputText/>
                    <AddTask/>
                </div>
            </div>
        </TaskDataContext.Provider>
    )
} 