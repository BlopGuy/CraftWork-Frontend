import React from 'react';
import { getAllShops } from '../api';
import { Link } from 'react-router-dom';

function ShopList() {

    const [shops, setShops] = React.useState([]);

    React
        .useEffect(() => {
            getAllShops()
                .then((response) => {
                    setShops(response.data);
                });
        }, []);

    return (
        <div class="row row-cols-1 row-cols-md-5 g-4">
            {shops.map((shop) => {
                return (
                    <div class="col" key={shop.id}>
                        <div class="card"  style={{height: '250px'}}>
                            <Link to={`/shops/${shop._id}`}>
                                <img src={shop.imageUrl} alt='shopImage' style={{width: '100px'}}/>
                                {shop.shopName}
                            </Link>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ShopList;