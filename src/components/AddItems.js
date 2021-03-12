import React from 'react';
import { getShop, uploadFile, addProduct, updateShop } from '../api';


function AddProduct({ match, history }) {
    const productNameRef = React.useRef();
    const priceRef = React.useRef();
    const descriptionRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();
    const [shop, setShop] = React.useState();
    const shopId = match.params.shopId;

    React
        .useEffect(() => {
            getShop(shopId)
                .then((response) => {
                    setShop(response.data);
                });
        }, [match.params.shopId]);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

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
                        let tempArray = [...shop.productList];
                        tempArray.push(response.data._id);
                        let updatedShop = {
                            _id: shopId,
                            shopName: shop.username,
                            imageUrl: shop.imageUrl,
                            productList: tempArray
                        }
                        updateShop(updatedShop)
                            .then(() => {
                                history.push(`/shops/${shopId}`);
                            })
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