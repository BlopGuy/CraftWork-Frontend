import React from 'react';
import {  getUser, deleteUser, updateUser, addShop } from '../api';


function Profile({ match, history }) {
    const [user, setUser] = React.useState({});
    const userId = match.params.userId;


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

    const { name, imageUrl, price } = product;
    return name ? (
        <>
        </>
    ) : <p>Loading...</p>

}

export default Profile;