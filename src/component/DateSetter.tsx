import { useContext } from "react";
import { TaskDataContext } from "../context/TaskDataContext";



export const DateSetter = () => {

    const {date, setDate} = useContext(TaskDataContext)
    const options:Intl.DateTimeFormatOptions = {day: '2-digit', month: 'short', year: 'numeric'};
    const shortDate:string = new Date(date).toLocaleDateString('en-US', options);

    return (
    <div className="date-container">
        <h1 className="date-display">{shortDate}</h1>
        <input type="date" className="date-picker" onChange={(e) => setDate(e.target.value)}/>
    </div>)
}