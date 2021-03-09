import React from 'react';
import { getShop, deleteShop, getProduct } from '../api';
import { Link } from 'react-router-dom';

function ShopDetails({ match, history }) {
    const [shop, setShop] = React.useState({});
    const shopId = match.params.shopId;

    React
        .useEffect(() => {
            getShop(shopId)
                .then((response) => {
                    setShop(response.data);
                });
        }, [match.params.shopId]);

    const handleDeleteShop = (id) => {
        deleteShop(id)
            .then(() => {
                history.push('/shops');
            });
    }

    const { _id, shopName, imageUrl } = shop;
    return shopName ? (
        <>
            <h2>{shopName}</h2>
            <img src={imageUrl} alt='shopImg' />

            <div class="row row-cols-1 row-cols-md-5 g-4">
                {shop.productList.map((productID) => {
                    getProduct(productID)
                        .then((response) => {
                            return (
                                <div class="col" key={_id}>
                                    <div class="product">
                                        <Link to={`/shops/${shop._id}/products/${response._id}`}>
                                            <img src={response.imageUrl} alt='shopImage' />
                                            <h2>{response.name}</h2>
                                            <p>{response.price}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })

                }
                )}
            </div>
        </>
    ) : <p>Loading...</p>

}

export default ShopDetails;