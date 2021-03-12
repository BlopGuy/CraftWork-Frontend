import React from 'react';
import { getShop, deleteShop, uploadFile, updateShop } from '../api';
import { Link } from 'react-router-dom';


function EditShop({ match, history }) {
    const [shop, setShop] = React.useState({});
    const [imageUrl, setImage] = React.useState();
    const shopNameRef = React.useRef();
    const userId = match.params.userId;
    const shopId = match.params.shopId;


    React
        .useEffect(() => {
            getShop(shopId)
                .then((response) => {
                    setShop(response.data);
                });
        }, [match.params.shopId]);

    const handleDeleteShop = () => {
        deleteShop(shopId)
            .then(() => {
                history.push(`/profile/${userId}`);
            });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (imageUrl !== null) {
            const uploadData = new FormData();
            uploadData.append('file', imageUrl);

            uploadFile(uploadData)
                .then((response) => {
                    const updatedShop = {
                        _id: shop._id,
                        shopName: shopNameRef.current.value,
                        imageUrl: response.data.fileUrl,
                        productList: shop.productList,
                        ownedBy: shop.ownedBy
                    }

                    updateShop(updatedShop)
                        .then(() => {
                            history.push(`/profile/${userId}/shop/${shopId}`);
                        });
                });
        } else {
            const updatedShop = {
                _id: shop._id,
                shopName: shopNameRef.current.value,
                imageUrl: shop.imageUrl,
                productList: shop.productList,
                ownedBy: shop.ownedBy
            }

            updateShop(updatedShop)
                .then(() => {
                    history.push(`/profile/${userId}/shop/${shopId}`);
                });
        }

    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };


    return shop.shopName ? (
        <>
            <div>
                <img src={shop.imageUrl} alt='shopCurrImage' style={{ width: '175px' }} />
                <h2>{shop.shopName}</h2>
            </div>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <label>Shop Name</label>
                <input type='text' name='shopName' ref={shopNameRef} placeholder={shop.shopName} />

                <label>Image</label>
                <input type='file' name='imageUrl' onChange={handleFileChange} />

                <button type='submit'>Update</button>
            </form>
            <Link to={`/profile/${userId}/shop/${shopId}/additem`}>
                Add a product to your shop
            </Link>

            <button onClick={handleDeleteShop}>Close Shop</button>
        </>
    ) : <p>Loading...</p>

}

export default EditShop;