import React from 'react';
import { logout } from '../api';
import { Link } from 'react-router-dom';

function NavBar({ loggedInUser, setCurrentUser}) {
    

    const logoutUser = () => {
        logout()
            .then(() => {
                setCurrentUser(null);
            })
    }


    return loggedInUser ? (
        //logged in
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container-fluid">
                    <div className='flex-div' style={{ float: 'left', display: 'inline-block!important' }}>
                        <a className="navbar-brand">CraftWork.You</a>
                        <Link className="nav-link active" to='/'>
                            Home
                        </Link>
                        <Link className="nav-link active" to='/about'>
                            About
                        </Link>
                        <Link className="nav-link active" to='/shops'>
                            Shops
                        </Link>
                    </div>
                    <div className='flex-div' style={{ float: 'right', display: 'inline-block!important' }}>
                        <a className="navbar-brand">Welcome {loggedInUser.username}</a>
                        <Link className="nav-link" to={`/profile/${loggedInUser._id}`}>
                            Profile
                        </Link>
                        <Link className="nav-link" to={`/cart/${loggedInUser._id}`}>
                            Cart
                        </Link>
                        <Link to='/'>
                            <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                        </Link>

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
                        <a className="navbar-brand">CraftWork.You</a>
                        <Link className="nav-link active" to='/'>
                            Home
                        </Link>
                        <Link className="nav-link active" to='/about'>
                            About
                        </Link>
                        <Link className="nav-link active" to='/shops'>
                            Shops
                        </Link>
                    </div>
                    <div className='flex-div' style={{ float: 'right', display: 'inline-block!important' }}>
                        <Link className="nav-link active" to='/login'>
                            Login
                        </Link>
                        <Link className="nav-link active" to='/signup'>
                            Sign Up
                        </Link>
                    </div>

                </div>
            </nav>
        </>

    )
}

export default NavBar;