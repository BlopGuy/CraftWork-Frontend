import React from 'react';
import {  getProduct, deleteProduct } from '../api';

function ProductDetails({ match, history }) {
    const [product, setProduct] = React.useState({});
    const productId = match.params.productId;
    const shopId = match.params.shopId;

    React
        .useEffect(() => {
            getProduct(productId)
                .then((response) => {
                    setProduct(response.data);
                });
        }, [match.params.productId]);

    const handleDeleteProduct = () => {
        deleteProduct(productId)
            .then(() => {
                history.push(`/shops/${shopId}`);
            });
    }

    const { name, imageUrl, price } = product;
    return name ? (
        <>
        <h1>{name}</h1>
        <img src={imageUrl} alt='productImage'/>
        <h2>{price}</h2>
        </>
    ) : <p>Loading...</p>

}

export default ProductDetails;