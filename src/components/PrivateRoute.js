import React from 'react';
import { loggedin } from '../api';
import { Route, Redirect } from 'react-router-dom';

//High Order Component
function PrivateRoute({ path, exact, component, loggedInUser }) {
    const [isLoading, setLoading] = React.useState(true);
    const [isLoggedIn, setLoggedIn] = React.useState(false);

    React
        .useEffect(() => {
                if (loggedInUser === null) {
                    setLoading(true);
                    setLoggedIn(false);
                } else {
                    setLoading(false);
                    setLoggedIn(true);
                }
        })

    return isLoading ? (null) : (
        isLoggedIn
            ? <Route path={path} component={component} exact={exact} />
            : <Redirect to="/login" />)


}

export default PrivateRoute;
