
import "./App.css"
import React, { useState } from "react"

const TodoList = () => {
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState([]);

    const addList = () => {
        // SetList([...list, newTask])
        // console.log(list);
        const updatedList = ([...tasks, taskInput])
        setTasks(updatedList);
        console.log(updatedList);
        return updatedList;
    }
    const removeList = (index) => {
        const removeUpdateList = tasks.filter((ele, id) => {
            return index !== id;
        })
        setTasks(removeUpdateList)
    }
    const removeAll = ()=>{
        setTasks([])
    }
    return (
        <>
            <h1>My Todo List</h1>
            <div className="container">
                <div className="search-box">
                    <input type="text" placeholder="Add a new task" value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)} />
                    <button onClick={addList}>Add</button>
                </div>
                {
                    tasks.map((item, index) => (

                        <div key={index} className="list-box">
                            <p>{item}</p>
                            <button onClick={() => removeList(index)}>Delete</button>
                        </div>
                    ))
                }
                {tasks.length >= 1 && <button className="remove-all" onClick={removeAll}>Remove All</button>}
            </div>
        </>
    )

}
export default TodoList