import React from 'react';
import {useRouteError, isRouteErrorResponse, Link} from 'react-router-dom';

export function ErrorPage() {
    const error = useRouteError() as Error;
    if (!isRouteErrorResponse(error)) {
        return null;
    }

    return (
        <div id="error-page" className="center-div">
            <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    Error ({error.status}): <i>{error.statusText || error.message}</i>
                </p>
                <Link to={'/'}>Go back</Link>
            </div>

        </div>
    );
}
