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
            <div className='flex-div' style={{ flexDirection: 'column', alignItems: 'center', margin: '50px'}}>
                <h1><strong>Sign up</strong></h1>
                <form onSubmit={handleFormSubmit} style={{ width: '500px' }}>
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text" className="form-control"  ref={usernameRef} />
                    </div>

                    <div className="form-group">
                        <label >Password</label>
                        <input type='password' className="form-control" name='password' ref={passwordRef} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{margin: '25px'}}>SignUp</button>
                </form>
                <p>Already have an account?
                <Link to='/login'>Login</Link>
            </p>
            </div>
        </>
    )

}

export default Signup;