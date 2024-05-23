import { useRef } from "react"
import Input from "../custom-component/Input"
import Modal from "../custom-component/Modal"

export default function NewProject({ onAddProject, onCancel }) {
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueDateRef = useRef()
    const dialog = useRef()


    function handleSaveProject() {
        const enterTitle = titleRef.current.value
        const enterDescription = descriptionRef.current.value
        const enterDueDate = dueDateRef.current.value

        if (enterTitle.trim() === '' ||
            enterDescription.trim() === '' ||
            enterDueDate.trim() === '') {
            dialog.current.open()
            return
        }

        // lift the state in projectManagment component
        onAddProject({
            title: enterTitle,
            description: enterDescription,
            dueDate: enterDueDate
        })
    }
    
    return (
        <>
            <Modal ref={dialog}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
                <p className="text-stone-600 mb-4">looks like you forgot to enter a value</p>
                <p className="text-stone-600 mb-4">fill out all the required fields</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex item-center justify-end gap-4 my-4">
                    <li>
                        <button
                            onClick={onCancel}
                            className="text-stone-800 hover:text-stone-950">
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleSaveProject}
                            className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" label="Title " ref={titleRef} />
                    <Input type="text" label="Description " textarea ref={descriptionRef} />
                    <Input type="date" label=" Due Date" ref={dueDateRef} />
                </div>
            </div>
        </>
    )
}
