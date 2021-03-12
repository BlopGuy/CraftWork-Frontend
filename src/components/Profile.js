import React from 'react';
import { getUser, deleteUser, updateUser, logout } from '../api';
import { Link } from 'react-router-dom';

function Profile({ match, history }) {
    const [user, setUser] = React.useState({});
    const userId = match.params.userId;

    React
        .useEffect(() => {
            getUser(userId)
                .then((response) => {
                    setUser(response.data);
                })
        }, [match.params.userId])

    const handleDeleteUser = () => {
        deleteUser(userId)
            .then(() => {
                logout()
                    .then(() => {
                        history.push(`/`);
                    })
            });
    }


    return !user.shop ? (
        <>
            <div>
                <img src={user.imageUrl} alt='userCurrImage' style={{ width: '175px' }} />
                <h2>{user.username}</h2>
                <p>You have <span className='text-warning'>{user.credits}</span></p>
            </div>
            <Link to={`/profile/${userId}/shop/add`}>
                Create shop
        </Link>
            <button onClick={handleDeleteUser}>Delete Account</button>
        </>
    ) : (
        <>
            <div>
                <img src={user.imageUrl} alt='userCurrImage' style={{ width: '175px' }} />
                <h2>{user.username}</h2>
                <p>You have <span className='text-warning'>{user.credits}</span> credits</p>
            </div>
            <Link to={`/profile/${userId}/shop/${user.shop}`}>
                Edit shop
        </Link>
            <button onClick={handleDeleteUser}>Delete Account</button>
        </>
    )

}

export default Profile;