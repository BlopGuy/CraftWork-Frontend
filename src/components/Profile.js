import React from 'react';
import { getUser, deleteUser, updateUser, uploadFile, logout, getFox } from '../api';
import { Link } from 'react-router-dom';

function Profile({ match, history }) {
    const [user, setUser] = React.useState({});
    const [fox, updateFox] = React.useState({});
    const [imageUrl, setImage] = React.useState();
    const nameRef = React.useRef();
    const userId = match.params.userId;

    React
        .useEffect(() => {
            getUser(userId)
                .then((response) => {
                    setUser(response.data);
                    getFox()
                        .then((response) => {
                            updateFox(response.data.image);
                            console.log(response);
                        })
                })
        }, [nameRef])

    const handleDeleteUser = () => {
        deleteUser(userId)
            .then(() => {
                logout()
                    .then(() => {
                        history.push(`/`);
                    })
                    history.push(`/`);
            });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (imageUrl !== null) {
            const uploadData = new FormData();
            uploadData.append('file', imageUrl);

            uploadFile(uploadData)
                .then((response) => {
                    const updatedUser = {
                        _id: user._id,
                        username: nameRef.current.value,
                        imageUrl: response.data.fileUrl,
                        shoppingCart: user.shoppingCart,
                        password: user.password,
                        shop: user.shop
                    }

                    updateUser(updatedUser)
                        .then(() => {
                            history.push(`/profile/${userId}`);
                        });
                });
        } else {
            const updatedUser = {
                _id: user._id,
                username: nameRef.current.value,
                imageUrl: user.imageUrl,
                shoppingCart: user.shoppingCart,
                password: user.password,
                shop: user.shop
            }

            updateUser(updatedUser)
                .then(() => {
                    history.push(`/`);
                });
        }
    }

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };


    return !user.shop && fox ? (
        <div className='flex-div' style={{ marginTop: '5%', justifyContent: 'center' }}>
            <div style={{margin: '50px'}}>
                <div>
                    <img src={user.imageUrl} alt='Insert Image' style={{ width: '175px', borderRadius: '15px' }} />
                    <h2>{user.username}</h2>
                    <p>You have <span style={{color: 'chocolate'}}>{user.credits}</span> credits</p>
                </div>
                <div id='fox-div'>
                    <p>Random fox just for you</p>
                    <img src={fox} alt='fox Image' style={{ maxWidth: '200px', borderRadius: '20px', maxHeight: '75px' }} />
                </div>

            </div>
            <div className='flex-div' style={{ flexDirection: 'column', margin: '50px' }}>
                <form onSubmit={handleFormSubmit} encType='multipart/form-data' style={{ width: '500px' }}>
                    <div className="form-group">
                        <label >Account name</label>
                        <input type="text" className="form-control" placeholder="update your name" ref={nameRef} />
                    </div>

                    <div className="form-group">
                        <label >Profile picture</label>
                        <input type='file' className="form-control" name='imageUrl' onChange={handleFileChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ margin: '30px' }}>Submit</button>
                </form>
                <div className='flex-div' style={{ justifyContent: 'center', marginTop: '200px' }}>
                    <Link to={`/profile/${userId}/shop/add`}>
                        <button className='btn btn-primary'>Create shop</button>
                    </Link>
                    <div>
                        <button onClick={handleDeleteUser} className="btn btn-danger">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex-div' style={{ marginTop: '5%', justifyContent: 'center' }}>
            <div>
                <div>
                    <img src={user.imageUrl} alt='Insert Image' style={{ width: '175px', borderRadius: '15px' }} />
                    <h2>{user.username}</h2>
                    <p>You have <span style={{color: 'chocolate'}}>{user.credits}</span> credits</p>
                </div>
                <div id='fox-div'>
                    <p>Random fox just for you </p>
                    <img src={fox} alt='fox Image' style={{ width: '200px', borderRadius: '20px' }} />
                </div>

            </div>
            <div className='flex-div' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleFormSubmit} encType='multipart/form-data' style={{ width: '500px' }}>
                    <div className="form-group">
                        <label >Account name</label>
                        <input type="text" className="form-control" placeholder="update your name" ref={nameRef} />
                    </div>

                    <div className="form-group">
                        <label >Profile picture</label>
                        <input type='file' className="form-control" name='imageUrl' onChange={handleFileChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className='flex-div' style={{ justifyContent: 'center', marginTop: '200px' }}>
                    <Link to={`/profile/${userId}/shop/${user.shop}`}>
                        <button className='btn btn-primary'>Edit shop</button>
                    </Link>
                    <div>
                        <button onClick={handleDeleteUser} className="btn btn-danger">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;