import React from 'react';
import {TaskComponentProps} from '../models/task.model';

/**
 * Task visual component, functionality comes from the supplying parent. Buttons hardcoded but
 * could've been an array of callbacks mapped out to make the component more dynamic.
 * @param onMark on checkbox checked callback
 * @param onEdit  on edit button click callback button
 * @param onDetail on detail button click callback
 * @param onDelete on delete button click callback
 * @param task Task object, contains props
 */
export function Task({onMark, onEdit, onDetail, onDelete, task}: TaskComponentProps) {
    return (
        <table className="task-item">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" id={`task-${task.id}-completed`} name="completed" aria-label={'completed'}
                           onChange={() => onMark(task.id)} checked={task.completed}/>
                </th>
                <th>
                    <h3 aria-label="title">{task.title}</h3>
                </th>
                <th>
                    <div>
                        <button id="btn-edit" className="info" onClick={() => onEdit(task.id)}>Edit</button>
                        <button id="btn-info" className="info" onClick={() => onDetail(task.id)}>Details</button>
                        <button id="btn-delete" className="danger" onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </th>
            </tr>
            </thead>
        </table>
    )
}
