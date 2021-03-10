import React from 'react';
import { getShop, uploadFile, addProduct, updateShop } from '../api';


function AddProduct({ match, history }) {
    const productNameRef = React.useRef();
    const priceRef = React.useRef();
    const descriptionRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();
    let shop = {};
    const userId = match.params.userId;
    const shopId = match.params.shopId;


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        getShop(shopId)
            .then((response) => {
                shop = response.data;
            });

        uploadFile(uploadData)
            .then((response) => {
                const newProduct = {
                    name: productNameRef.current.value,
                    imageUrl: response.data.fileUrl,
                    ownedBy: shopId,
                    price: priceRef.current.value,
                    description: descriptionRef.current.value
                }

                addProduct(newProduct)
                    .then((response) => {
                        shop.productList.push(response.data._id);
                        console.log(shop);
                        updateShop(shop);
                        history.push(`/shops/${shopId}`);
                    });
            });

    };

    const handleFileChange = (event) => {
        setImageUrl(event.target.files[0]);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <label>Product name</label>
                <input type='text' ref={productNameRef} />

                <label>Price</label>
                <input type='text' ref={priceRef} />

                <label>Description</label>
                <input type='text' ref={descriptionRef} />

                <label>Image</label>
                <input type='file' name='imageUrl' onChange={handleFileChange} />

                <button type='submit'>Add product</button>
            </form>
        </>
    )

}

export default AddProduct;