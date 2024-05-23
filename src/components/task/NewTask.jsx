import { useState, useContext } from "react"
import { TasksContext } from './TasksContext';

export default function NewTask() {
    const [enteredTask, setEnteredTask] = useState({
        id: null,
        description: ''
    })
    const { addTask } = useContext(TasksContext);

    function handleChange(event) {
        setEnteredTask({
            id: Math.random(),
            description: event.target.value
        })
    }

    function handleAddClick() {
        addTask(enteredTask)
        setEnteredTask({
            id: null,
            description: ''
        })
    }
    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                onChange={handleChange}
                value={enteredTask.description}
            />
            <button
                className="text-stone-700 hover:text-stone-950"
                onClick={handleAddClick}
            >Add task
            </button>
        </div>
    )
}
