
import { useContext } from 'react';
import { TasksContext } from './TasksContext';
import NewTask from "./NewTask"

export default function Task() {
    const { tasks, removeTask } = useContext(TasksContext);

    function handleRemoveClick(taskId) {
        removeTask(taskId)
    }
    return (
        <section>
            <h2 className="text-2xl font-bold test-stone-700 mb-4">Tasks</h2>
            <NewTask />
            {tasks.length === 0 && <p className="text-stone-800 my-4">This projects does not have any taks yet.</p>}
            <ul>
                {tasks.map((task) => {
                    return (
                        <span key={task.id} className="flex items-center gap-4">
                            <li>{task.description}</li>
                            <button
                            onClick={() => handleRemoveClick(task.id)} 
                            className="text-stone-700 hover:text-stone-950"
                            >Remove</button>
                        </span>
                    )
                })}
            </ul>
        </section>
    )
}