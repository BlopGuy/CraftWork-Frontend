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
            <div style={{ margin: '50px', justifyContent: 'space-around' }}>
                <div>
                    <h1>{name}</h1>
                    <img src={imageUrl} alt='productImage' style={{ maxWidth: '300px' }} />
                </div>

                <h2>Price: {price} credits</h2>
                <button onClick={AddToCart} className='btn btn-primary'>Add to cart</button>
            </div>
        </>

    )

}

export default ProductDetails;