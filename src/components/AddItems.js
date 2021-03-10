import React from 'react';
import { getUser, updateUser, getShop, getProduct, uploadFile } from '../api';


function AddProduct({ match, history }) {
    const shopNameRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();
    let user = {};
    const userId = match.params.userId;


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        getUser(userId)
            .then((response) => {
                user = response.data;
            });

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
                        user.shop = response.data._id;
                        console.log(user);
                        updateUser(user);
                        history.push(`/profile/${userId}`);
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