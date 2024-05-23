import Task from "../task/Task";

export default function DisplayProject({project, onDelete}) {
    
    const formatterDate = new Date(project.dueDate).toLocaleDateString(
        'en-US',{
            year:'numeric',
            month:'short',
            day:'numeric'
        }
    );
    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex item-ceter justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                    <button onClick = {onDelete} className="text-stone-600 hover:text-stone-950">Delete</button>
                </div>
                <p className="text-stone-400 mb-4">{formatterDate}</p>
                <p className="text-stone-600 witespace-pre-wrap">{project.description}</p>
            </header>
            <Task/>
        </div>
    )
}