import React, { useContext, useEffect, useState } from "react";
import { TaskDataContext } from "../context/TaskDataContext";

export const Search = () => {
    const {setSearchQuery} = useContext(TaskDataContext);
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSearchQuery(value)
        }, 500)

        return () => {
            clearTimeout(timeOut)
        }
    }, [value])

    return (
        <div className="search-div">
            <input type="text" className="search-bar" value={value} placeholder="Search" onChange={(e) => {
                setValue(e.target.value)
            }}/>
        </div>
    )
}