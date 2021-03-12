import React from 'react';
import { getProduct } from '../api';
import { Link } from 'react-router-dom';

function ItemRender({ productID, shopID }) {
    const [product, setProduct] = React.useState({});

    React
        .useEffect(() => {
            getProduct(productID)
                .then((response) => {
                    setProduct(response.data);
                });
        }, [productID]);

    return product.name ? (
            <div className="col" key={productID}>
                <div className="product">
                    <Link to={`/shops/${shopID}/products/${productID}`}>
                        <img src={product.imageUrl} alt='shopImage' style={{ height: '100px' }} />
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                    </Link>
                </div>
            </div>
    ) : <p>Loading...</p>

}

export default ItemRender;