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
            <Link to={`/shops/${product.ownedBy}/products/${product._id}`} style={{height: '75px',display: 'flex', textDecoration: 'none', backgroundColor: 'chocolate'}}>
                <img src={product.imageUrl} alt='productImage' style={{ height: '50px' }} />
                <h3>{product.name}</h3>
                <h3 style={{ float: 'right', color: 'black'}}>{product.price} Credits</h3>
            </Link>
    )

}

export default CartItem;