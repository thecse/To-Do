import React, { useContext } from "react";
import { TaskDataContext } from "../context/TaskDataContext";

export const AddTask = () => {
    const {addingTask, setAddingTask} = useContext(TaskDataContext);
    return (
        <div className="add-task-button">
            <button type="button" disabled={addingTask} onClick={() => {
                setAddingTask(true)
            }}>Add Task</button>
        </div>
    )
}