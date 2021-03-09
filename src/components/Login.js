import React from 'react';
import { login } from '../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ history, setCurrentUser }) {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        login(usernameRef.current.value, passwordRef.current.value)
            .then((response) => {
                setCurrentUser(response.data);
                history.push('/');
            })
            .catch(() => {
                toast.error('Invalid Login');
            });
    };


    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input type='text' name='username' ref={usernameRef} />

                <label>Username</label>
                <input type='password' name='password' ref={passwordRef} />

                <button type='submit'>Login</button>
            </form>

            <p>Not signed up yet?
                <Link to='/signup'>Signup</Link>
            </p>
        </>
    )

}

export default Login;