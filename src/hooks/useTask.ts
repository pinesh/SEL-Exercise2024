import {useContext} from 'react';
import {TaskContext} from "../providers/taskProvider";

export const useTask = () => useContext(TaskContext);