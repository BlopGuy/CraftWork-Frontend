import React from 'react';
import { getProduct } from '../api';
import { Link } from 'react-router-dom';

function CartItem({ productID, remove, index }) {
    const [product, setProduct] = React.useState({});

    React
        .useEffect(() => {
            getProduct(productID)
                .then((response) => {
                    setProduct(response.data);
                });
        }, [productID]);

    return (
            <Link to={`/shops/${product.ownedBy}/products/${product._id}`}>
                <img src={product.imageUrl} alt='productImage' style={{ height: '50px' }} />
                <h2>{product.name}</h2>
                <p style={{ float: 'right' }}>{product.price} Credits</p>
            </Link>
    )

}

export default CartItem;