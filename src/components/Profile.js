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
                });
        }, [match.params.userId]);

    const handleDeleteUser = () => {
        deleteUser(userId)
            .then(() => {
                history.push(`/`);
                logout();
            });
    }

    const { username } = user;
    return username ? (
        <>
        <Link to={`/profile/${userId}/shop/add`}>
        Create shop
        </Link>
        <button onClick={handleDeleteUser}>Delete Account</button>
        </>
    ) : <p>Loading...</p>

}

export default Profile;