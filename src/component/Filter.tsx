import React, { useContext, useState } from "react";
import { TaskDataContext } from "../context/TaskDataContext";
import { filterKey } from "../util/UtilFunction";
import { StringOrNull } from "../Interface/TypeDef";
import { FilterBy } from "../constant/FilterConstant";

export const Filter = () => {
    const {taskList, setTaskList, date} = useContext(TaskDataContext)
    const initialFilter:StringOrNull = localStorage.getItem(filterKey(date));
    const [filterValue, setFilterValue] = useState<string>(initialFilter !== null ? initialFilter : FilterBy.all);
    
    const onChangeHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        let updatedList = taskList.map((element:any) => {
            if(!element.checked && selectedValue === FilterBy.completed) {
                return {
                    ...element,
                    display: false
                };
            } else if(element.checked && selectedValue === FilterBy.incompleted) {
                return {
                    ...element,
                    display: false
                };
            } else {
                return {
                    ...element,
                    display: true
                };
            }
        })
        console.log(updatedList)
        setTaskList(updatedList)
        setFilterValue(selectedValue);
        localStorage.setItem(filterKey(date), selectedValue);
    }

    return (
        <div className="filter">
            <select className="filter-options" value={filterValue} onChange={onChangeHandler}>
                <option value={FilterBy.all}>All</option>
                <option value={FilterBy.completed}>Completed</option>
                <option value={FilterBy.incompleted}>Incompleted</option>
            </select>
        </div>
    )
}