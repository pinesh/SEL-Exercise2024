import React from 'react'
import {TaskManager} from '../components/taskManager';

export function Root() {
    return (
        <>
            <div id="root">
                <div className="card">
                    <h1>Typescript Task Manager Demo</h1>
                    <TaskManager></TaskManager>
                </div>
            </div>
        </>
    );
}