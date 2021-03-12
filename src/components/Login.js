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
            <div className='flex-div' style={{ flexDirection: 'column', alignItems: 'center', margin: '50px'}}>
                <h1><strong>Login</strong></h1>
                <form onSubmit={handleFormSubmit} style={{ width: '500px' }}>
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text" className="form-control"  ref={usernameRef} />
                    </div>

                    <div className="form-group">
                        <label >Password</label>
                        <input type='password' className="form-control" name='password' ref={passwordRef} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{margin: '25px'}}>login</button>
                </form>
                <p>Not signed up yet?
                <Link to='/signup'>Signup</Link>
                </p>
            </div>
        </>
    )

}

export default Login;