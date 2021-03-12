import React from 'react';
import { getShop, getProduct } from '../api';
import { Link } from 'react-router-dom';
import ItemRender from './ItemRender';

function ShopDetails({ match, history }) {
    const [shop, setShop] = React.useState({});
    const shopId = match.params.shopId;

    React
        .useEffect(() => {
            getShop(shopId)
                .then((response) => {
                    setShop(response.data);
                });
        }, []);

    const productRender = (productId) => {
        getProduct(productId)
            .then((response) => {
                return (
                    <div className="col" key={productId}>
                        <div className="product">
                            <Link to={`/shops/${shop._id}/products/${response.data._id}`}>
                                <img src={response.data.imageUrl} alt='shopImage' />
                                <h2>{response.data.name}</h2>
                                <p>{response.data.price}</p>
                            </Link>
                        </div>
                    </div>
                )
            })
    }


    return shop.shopName ? (
        <>
            <h2>{shop.shopName}</h2>
            <img src={shop.imageUrl} alt='shopImg' style={{ width: '300px' }} />

            <div className="row row-cols-1 row-cols-md-5 g-4">
                {shop.productList.map((productId) => {
                    return <ItemRender productID={productId} shopID={shop._id}/>
                })}
            </div>
        </>
    ) : <p>Loading...</p>

}

export default ShopDetails;