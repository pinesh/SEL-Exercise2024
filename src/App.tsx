import React from 'react';
import {useTask} from './hooks/useTask';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ErrorPage} from './routes/errorPage';
import {Root} from './routes/root';
import {TaskDetails} from './routes/taskDetails';
import {TaskProps} from './models/task.model';

function App() {
    const task = useTask();
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: true,
                    element: <Root/>,
                },
                {
                    path: '/:taskID',
                    element: <TaskDetails/>,
                    loader: async ({params}): Promise<TaskProps> => {
                        const taskId = Number(params.taskID || '');

                        if (!isFinite(taskId)) throw new Response('Bad Request', {status: 400});

                        let currentTask = task.fetch(taskId)

                        if (currentTask) {
                            return currentTask;
                        }
                        throw new Response('Not Found', {status: 404});
                    }
                }
            ]
        }
    ]);
    return <RouterProvider router={router}/>;
}

export default App;
