import {Fragment} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {TaskProps} from '../models/task.model';

export function TaskDetails() {

    // safe to cast this as TaskProps as the loader for this page returns a TaskProps object
    const data = useLoaderData() as TaskProps;
    return (
        <Fragment>
            <Link to={'/'}>Back</Link>
            <div className="card">
                <div className="container">
                    <div className="field-row">
                        <label><b>Title:</b></label><span className="value">{data.title}</span>
                    </div>
                    <div className="field-row">
                        <label><b>Created date:</b></label><span
                        className="value">{new Date(data.id).toDateString()}</span>
                    </div>
                    <div className="field-row">
                        <label><b>Status:</b></label><kbd
                        className={`value ${data.completed ? 'text-green' : 'text-red'}`}>{data.completed ? 'Complete' : 'Incomplete'}</kbd>
                    </div>
                    <label><b>Details:</b></label>
                    <br/>
                    <span className="value">{data.details}</span>
                </div>
            </div>

        </Fragment>
    );
}
