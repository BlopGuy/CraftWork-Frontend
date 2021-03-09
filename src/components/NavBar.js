import React from 'react';
import { logout } from '../api';

function NavBar({ loggedInUser, setCurrentUser, history }) {


    const logoutUser = () => {
        logout()
            .then(() => {
                setCurrentUser(null);
            })
    }


    return loggedInUser ? (
        //logged in
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className='flex-div' style={{ float: 'left', display: 'inline-block!important' }}>
                        <a className="navbar-brand">CraftWork.You</a>
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <a className="nav-link" href="about">About</a>
                        <a className="nav-link" href="shops">Shops</a>
                    </div>
                    <div className='flex-div' style={{ float: 'right', display: 'inline-block!important' }}>
                        <a className="navbar-brand">Welcome {loggedInUser.username}</a>
                        <a className="nav-link" href="user">Profile</a>
                        <button class="btn btn-danger" onClick={logoutUser}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    ) : (
        //unlogged in
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className='flex-div' style={{ float: 'left', display: 'inline-block!important' }}>
                        <a className="navbar-brand" href="#">CraftWork.You</a>
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <a className="nav-link" href="about">About</a>
                        <a className="nav-link" href="shops">Shops</a>
                    </div>
                    <div className='flex-div' style={{ float: 'right', display: 'inline-block!important' }}>
                        <a className="nav-link" href="login">Login</a>
                        <a className="nav-link" href="signup">Sign Up</a>
                    </div>

                </div>
            </nav>
        </>

    )
}

export default NavBar;