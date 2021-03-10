import React from 'react';
import { getUser, getProduct } from '../api';
import { Link } from 'react-router-dom';

function Cart({ match, history }) {
    const [user, setUser] = React.useState({});
    const userId = match.params.userId;

    React
        .useEffect(() => {
            getUser(userId)
                .then((response) => {
                    setUser(response.data);
                });
        }, [match.params.userId]);

    const { username, shoppingCart } = user;
    return username ? (
        <>
            <h1>Your shopping Cart</h1>

            <div class="row row-cols-1 row-cols-md-5 g-4">
                {shoppingCart.map((productID) => {
                    getProduct(productID)
                        .then((response) => {
                            return (
                                <div class="col" key={response.data._id}>
                                    <div class="product">
                                        <Link to={`/shops/${response.data.ownedBy}/products/${response.data._id}`}>
                                            <img src={response.data.imageUrl} alt='productImage' />
                                            <h2>{response.data.name}</h2>
                                            <p>{response.data.price}</p>
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

export default Cart;