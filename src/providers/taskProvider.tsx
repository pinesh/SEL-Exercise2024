import React, {createContext, useEffect, useReducer} from 'react';
import {TaskProps, TaskDispatcherActionProps, TaskContextProps} from '../models/task.model';

const defaultValue : TaskContextProps = {
    update: () => {
    },
    remove: () => {
    },
    mark: () => {
    },
    fetch: () => {
        return null
    },
    getTasks: () => {
        return []
    }
}

export const TaskContext = createContext<TaskContextProps>(defaultValue);

const initialState: TaskProps[] = [];

const initTasks = () : TaskProps[] => {
    let itemString = localStorage.getItem('sel_tasks');
    //If I were using additional libraries, I would add type checking to this parse to ensure the contents matched type at runtime
    return itemString ? (JSON.parse(itemString)) : []
}

const saveTasks = (tasks: TaskProps[]) => {
    localStorage.setItem('sel_tasks', JSON.stringify(tasks));
}


/**
 * Reducer function for handling the task array (in memory)
 * @param state current state of task array
 * @param action action (typed string)
 */
const taskReducer = (state: any, action: TaskDispatcherActionProps) => {
    switch (action.type) {
        case 'MARK':
            return state.map((Task: TaskProps) => {
                if (Task.id === action.payload?.id) {
                    return {...Task, completed: !Task.completed}
                }
                return Task
            })
        case 'UPSERT':
            if (state.some((Task: TaskProps) => Task.id === action.payload?.id)) {
                return state.map((Task: TaskProps) => {
                    if (Task.id === action.payload?.id) {
                        return action.payload
                    }
                    return Task
                });
            }
            return [...state, action.payload];
        case 'RESET':
            return initTasks();
        case 'DELETE':
            return state.filter((Task: TaskProps) => Task.id !== action.payload?.id)
        default:
            throw new Error(`Unhandled action: ${action.type}`);
    }
}

/**
 * Task Provider, handles the Task state and makes it accessible app wide.
 * @param children
 * @constructor
 */
export const TaskProvider = ({children}: any) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState, initTasks);

    //Local storage handling
    useEffect(() => {

        // There were a number of options for an efficient save, including listening to the page unload. Due to the
        // unreliability of that event across browsers/devices, I opted to just save on change,

        saveTasks(tasks);
    }, [tasks]);

    const update = (taskProps: TaskProps) => {
        dispatch({type: 'UPSERT', payload: taskProps});
    };

    const remove = (id: number) => {
        dispatch({type: 'DELETE', payload: {id}});
    };

    const mark = (id: number) => {
        return dispatch({type: 'MARK', payload: {id}})
    }

    const fetch = (id: number): TaskProps | null => {
        return tasks.find((Task: TaskProps) => Task.id === id);
    }

    const getTasks = (): TaskProps[] => {
        return tasks;
    }

    const value = {update, remove, mark, getTasks, fetch};

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );

};