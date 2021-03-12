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
            <div className="col" key={productID} style={{backgroundColor: 'bisque'}}>
                <div className="product" style={{backgroundColor: 'BurlyWood', borderRadius: '10px', boxShadow: '2px 5px chocolate'}}>
                    <Link to={`/shops/${shopID}/products/${productID}`}  style={{textDecoration: 'none', margin: '25px', color: 'grey'}}>
                        <img src={product.imageUrl} alt='productImage' style={{ height: '75px', borderRadius: '5px' }} />
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                    </Link>
                </div>
            </div>
    ) : <p>Loading...</p>

}

export default ItemRender;