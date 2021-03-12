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
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <label>Shop's name</label>
                <input type='text' ref={shopNameRef} />

                <label>Image</label>
                <input type='file' name='imageUrl' onChange={handleFileChange} />

                <button type='submit'>Create</button>
            </form>
        </>
    )

}

export default AddShop;