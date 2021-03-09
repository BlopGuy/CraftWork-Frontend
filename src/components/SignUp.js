import React from 'react';
import { signup } from '../api';
import { Link } from 'react-router-dom';

function Signup({ history }) {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        signup(usernameRef.current.value, passwordRef.current.value)
            .then(() => {
                history.push('/login');
            })
            .catch(() => {
                console.log('invalid signup')
            });
    };


    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input type='text' name='username' ref={usernameRef} />

                <label>Password</label>
                <input type='password' name='password' ref={passwordRef} />

                <button type='submit'>Login</button>
            </form>

            <p>Already have an account?
                <Link to='/login'>Login</Link>
            </p>
        </>
    )

}

export default Signup;