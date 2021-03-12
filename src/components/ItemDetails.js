import React from 'react';
import { getProduct, deleteProduct, getUser, updateUser } from '../api';

function ProductDetails({ loggedInUser, match, history }) {
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

    const AddToCart = () => {
        getUser(loggedInUser._id)
            .then((response) => {
                let buyer = response.data;
                buyer.shoppingCart.push(productId);
                updateUser(buyer)
                    .then(() => {
                        console.log('added to cart');
                    })
            })
    }

    const { name, imageUrl, price } = product;
    return (
        <>
            <h1>{name}</h1>
            <img src={imageUrl} alt='productImage' />
            <h2>{price}</h2>
            <button onClick={AddToCart}>Add to cart</button>
        </>
    )

}

export default ProductDetails;