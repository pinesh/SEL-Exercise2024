import {useState, Fragment, FormEvent} from 'react'
import {TaskFormProps, TaskProps} from '../models/task.model';

/**
 * React Component that provides a form for two fields
 * @param onSubmit Submit callback, should be passed the final fields.
 * @param activeTask Active task, can be null if we're adding a new one rather than an edit.
 * @constructor
 */
export function TaskForm({onSubmit, activeTask}: TaskFormProps) {

    // I would've normally used a reducer to handle all the fields as one object here using the TaskProps type, but It needs
    // to refresh when activeTask changes (issue with default html dialog vs regular js package modals)

    const [details, setDetails] = useState(activeTask?.details ?? '')
    const [title, setTitle] = useState(activeTask?.title ?? '')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // As a consequence of not using the reducer, need to create a "fields" object here instead.
        let fields: TaskProps = {
            details, completed: activeTask?.completed ?? false,
            title, id: activeTask?.id ?? new Date().getTime()
        };

        onSubmit(fields);

        //some cleanup required because dialog doesn't re-load when displayed again
        setTitle('')
        setDetails('')
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ftitle">Title:</label>
                <br/>
                <input style={{width: '100%'}} type="text" maxLength={100} required id="ftitle"
                       placeholder="Title (100 char limit) (required)" onChange={(e) => setTitle(e.target.value)}
                       value={title}/>
                <br/><br/>
                <label htmlFor="fdetails">Details:</label>
                <br/>
                <textarea style={{maxWidth: 'inherit', minWidth: '100%'}} rows={4} cols={50} maxLength={300}
                          placeholder="Optional details, (300 char limit)" id="fdetails"
                          onChange={(e) => setDetails(e.target.value)} value={details}/>
                <br/><br/>
                <div style={{display: 'flex', justifyContent: "end"}}>
                    <button type="submit" className={'info'} value="Submit">Submit</button>
                </div>
            </form>
        </Fragment>
    )
}