import React from 'react';
import { getUser, updateUser, addShop, uploadFile } from '../api';


function AddShop({ match, history }) {
    const shopNameRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();
    const [user, setUser] = React.useState();
    const userId = match.params.userId;


    React
        .useEffect(() => {
            getUser(userId)
                .then((response) => {
                    setUser(response.data);
                });
        }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        uploadFile(uploadData)
            .then((response) => {
                const newShop = {
                    shopName: shopNameRef.current.value,
                    imageUrl: response.data.fileUrl,
                    productList: [],
                    ownedBy: userId
                }

                addShop(newShop)
                    .then((response) => {
                        let updatedUser = {
                            _id: userId,
                            username: user.username,
                            password: user.password,
                            credits: user.credits,
                            shoppingCart: user.shoppingCart,
                            shop: response.data._id
                        }
                        updateUser(updatedUser)
                            .then(() => {
                                history.push(`/profile/${userId}`);
                            });
                    });
            });

    };

    const handleFileChange = (event) => {
        setImageUrl(event.target.files[0]);
    };

    return (
        <>
            <div className='flex-div' style={{ flexDirection: 'column', alignItems: 'center', margin: '50px'}}>
                <form onSubmit={handleFormSubmit} encType='multipart/form-data' style={{ width: '500px' }}>
                    <div className="form-group">
                        <label >Shop name</label>
                        <input type="text" className="form-control" ref={shopNameRef} />
                    </div>

                    <div className="form-group">
                        <label >Shop image</label>
                        <input type='file' className="form-control" name='imageUrl' onChange={handleFileChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{margin: '50px'}}>Create</button>
                </form>
            </div>
        </>
    )

}

export default AddShop;