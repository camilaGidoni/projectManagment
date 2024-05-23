import { useState } from 'react'
import ProjectsSideBar from './ProjectsSideBar'
import NewProject from './NewProject'
import NoProjectsSelected from './NoProjectsSelected'
import DisplayProject from './DisplayProject'
import { TasksContext } from '../task/TasksContext'

export default function ProjectsManagment() {
    const defaultProjectState = {
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    }
    const [projectsState, setProjectsState] = useState(defaultProjectState)

    function handleStartAddProject() {
        setProjectsState(prev => {
            return {
                ...prev,
                selectedProjectId: null
            }
        })
    }

    function handleAddProject(projectData) {
        setProjectsState(prev => {
            const id = Math.random()
            const newProject = {
                ...projectData,
                id: id
            };
            return {
                ...prev,
                selectedProjectId: undefined,
                projects: [...prev.projects, newProject]
            }
        })
    }

    function handleCancel() {
        setProjectsState(prev => {
            return {
                ...prev,
                selectedProjectId: undefined
            }
        })
    }

    function handleSelectProject(id) {
        setProjectsState(prev => {
            return {
                ...prev,
                selectedProjectId: id
            }
        })

    }

    function handleDeleteProject() {
        setProjectsState(prev => {
            return {
                ...prev,
                selectedProjectId: undefined,
                projects: prev.projects?.filter((project) => {
                    return project.id !== prev.selectedProjectId
                })
            }
        })
    }

    function handleAddTask(task) {
        setProjectsState(prev => {
            const id = Math.random()
            const newTask = {
                ...task,
                id: id,
                projectId: prev.selectedProjectId
            };
            return {
                ...prev,
                tasks: [...prev.tasks, newTask]
            }
        })
    }

    function handleRemoveTask(taskId) {
        setProjectsState(prev => {
            return {
                ...prev,
                tasks: prev.tasks?.filter((task) => {
                    return task.id !== taskId
                })
            }
        })

    }

    let content

    if (projectsState.selectedProjectId === null) {
        content = (
            <NewProject
                onAddProject={handleAddProject}
                onCancel={handleCancel}
            />
        )
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectsSelected onStartAddProject={handleStartAddProject} />
    } else {
        const selectedProject = projectsState.projects?.find(project => {
            return project.id === projectsState.selectedProjectId
        })
        let taskContext = {
            tasks: projectsState.tasks,
            addTask: handleAddTask,
            removeTask: handleRemoveTask
        }
        content = (
            <TasksContext.Provider value={taskContext}>
                <DisplayProject project={selectedProject} onDelete={handleDeleteProject} />;
            </TasksContext.Provider>
        )
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSideBar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelect={handleSelectProject}
            />
            {content}
        </main>
    )
}
