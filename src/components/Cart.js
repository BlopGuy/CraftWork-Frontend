import React from 'react';
import { getUser, getProduct, updateUser, getShop } from '../api';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import '../App.css';

function Cart({ match , updateWallet}) {
    const [user, setUser] = React.useState({});
    const [amountToPay, setAmount] = React.useState(0);
    const userId = match.params.userId;

    React
        .useEffect(() => {
            getUser(userId)
                .then((response) => {
                    setUser(response.data);
                });
        }, [match.params.userId]);

    React
        .useEffect(() => {
            if (user.shoppingCart) {
                let amount = 0;
                let promiseArray = user.shoppingCart.map((productId) => {
                    return getProduct(productId)
                        .then((response) => {
                            amount += response.data.price;
                        })
                })

                Promise
                    .all(promiseArray).then(() => {
                        setAmount(amount);
                    })
            }
        })

    // Executes the purchase, using the ownedBy parameter inside product to get the shop in which it is sold, 
    // which then uses the shop's ownedBy parameter to retrieve the shop owner and update their credit count.
    // Afterwards updates the buyer's credit count and clears the shopping cart.
    const executePurchase = () => {
        const { shoppingCart } = user;
        shoppingCart.forEach((productId) => {
            getProduct(productId)
                .then((currProduct) => {
                    let productFromDb = currProduct.data;

                    getShop(productFromDb.ownedBy)
                        .then((currShop) => {
                            let shopFromDb = currShop.data;

                            getUser(shopFromDb.ownedBy)
                                .then((shopOwner) => {
                                    let creditRecipient = shopOwner.data;
                                    creditRecipient.credits += productFromDb.price;

                                    updateUser(creditRecipient)
                                        .then(() => {
                                            let newCredits = user.credits - amountToPay;
                                            let updatedUser = {
                                                _id: user._id,
                                                username: user.username,
                                                password: user.password,
                                                credits: newCredits,
                                                shoppingCart: [],
                                                shop: user.shop
                                            }

                                            updateUser(updatedUser)
                                                .then(() => {
                                                    console.log('purchase was executed successfuly')
                                                });

                                        });
                                });
                        });
                });
        });
    };

    const removeFromCart = (indexToRemove) => {
        const { shoppingCart } = user;
        shoppingCart.splice(indexToRemove, 1);


        setUser(user => ({
            ...user,
            shoppingCart: shoppingCart
        }));
    };

    return user.username ? (
        <>
            <h1>Your shopping Cart</h1>
            <p>Total: {amountToPay} credits</p>
            <ul className="list-group">
                {user.shoppingCart.map((productId) => {

                    return (
                        <li className="list-group-item flex-div" key={productId}>
                            <CartItem productID={productId} remove={removeFromCart} />
                            {/* <button onClick={removeFromCart()}>Remove</button> */}
                        </li>
                    )
                }

                )}
            </ul>
            <button onClick={executePurchase}>Finish purchase</button>
        </>
    ) : <p> Loading ... </p>

}

export default Cart;