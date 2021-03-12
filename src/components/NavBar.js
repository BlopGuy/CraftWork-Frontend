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
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div className='flex-div' style={{ float: 'left', display: 'inline-block!important' }}>
                        <a className="navbar-brand text-warning"><strong>CraftWork.You</strong></a>
                        <Link className="nav-link active text-info" to='/'>
                            Home
                        </Link>
                        <Link className="nav-link active text-info" to='/shops'>
                            Shops
                        </Link>
                    </div>
                    <div className='flex-div' style={{ float: 'right', display: 'inline-block!important' }}>
                        <a className="navbar-brand text-light">Welcome CraftWorker!</a>
                        <Link className="nav-link text-info" to={`/profile/${loggedInUser._id}`}>
                            Profile
                        </Link>
                        <Link className="nav-link text-info" to={`/cart/${loggedInUser._id}`}>
                            Cart
                        </Link>
                        <Link to='/'>
                            <button className="btn btn-outline-danger" onClick={logoutUser}>Logout</button>
                        </Link>

                    </div>
                </div>
            </nav>
        </>
    ) : (
        //unlogged in
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div className='flex-div' style={{ float: 'left', display: 'inline-block!important' }}>
                    <a className="navbar-brand text-warning"><strong>CraftWork.You</strong></a>
                        <Link className="nav-link active text-info" to='/'>
                            Home
                        </Link>
                        <Link className="nav-link active text-info" to='/shops'>
                            Shops
                        </Link>
                    </div>
                    <div className='flex-div' style={{ float: 'right', display: 'inline-block!important' }}>
                        <Link className="nav-link active text-info" to='/login'>
                            Login
                        </Link>
                        <Link className="nav-link active text-info" to='/signup'>
                            Sign Up
                        </Link>
                    </div>

                </div>
            </nav>
        </>

    )
}

export default NavBar;