import React, {Fragment, useState} from 'react'
import {useTask} from '../hooks/useTask';
import {Task} from './task';
import {useNavigate} from 'react-router-dom';
import {TaskProps} from '../models/task.model';
import {Modal} from './modal'
import {TaskForm} from './taskForm';


/**
 * Task manager; using the provider, it maps out a list of tasks to an associated Task component and passes the required callbacks.
 *
 * @constructor
 */
export function TaskManager() {

    const taskHook = useTask();
    const navigate = useNavigate();


    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeTask, setActiveTask] = useState<TaskProps | null>(null);

    const handleDetailClick = (id: number) => {
        navigate(`/${id}`);
    }

    const handleEditClick = (id: number) => {
        setActiveTask(taskHook.fetch(id))
        openModal();
    }

    const handleUpdate = (task: TaskProps) => {
        taskHook.update(task)
        closeModal();
    }

    const handleMarkClick = (id: number) => {
        taskHook.mark(id)
    }

    const handleDeleteClick = (id: number) => {
        taskHook.remove(id)
    }

    const handleAddClick = () => {
        setActiveTask(null)
        openModal();
    }


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    return (<Fragment>
            <div style={{display: 'flex', flexDirection: 'row', padding: '8px'}}>
                <h2 style={{flexGrow: '1'}}>Tasks</h2>
                <button onClick={handleAddClick} className={'info'}
                        style={{alignSelf: 'center', fontSize: '16px', padding: '8px'}}>Add new Task
                </button>
            </div>
            <div className="container">
                {taskHook.getTasks().length > 0 ? <ul className="task-list">
                        {taskHook.getTasks().map((task) => {
                            return <li key={task.id}><Task onDelete={handleDeleteClick} onEdit={handleEditClick}
                                                           onMark={handleMarkClick} task={task}
                                                           onDetail={handleDetailClick}/></li>
                        })}
                    </ul> :
                    <p>No tasks present</p>}
            </div>
            <Modal key={activeTask?.id} isOpen={modalOpen} onClose={closeModal}
                   title={activeTask ? "Edit task" : "Add new task"}>
                <TaskForm onSubmit={handleUpdate} activeTask={activeTask}></TaskForm>
            </Modal>
        </Fragment>
    )

}