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
        <>
        <h1>Shops</h1>
            <div className="row row-cols-1 row-cols-md-5 g-4" style= {{margin: '50px'}}>
                {shops.map((shop) => {
                    return (
                        <div className="col" key={shop._id} style={{ backgroundColor: 'bisque' }}>
                            <div className="shop" style={{ backgroundColor: 'BurlyWood', borderRadius: '10px', boxShadow: '2px 5px chocolate' }}>
                                <Link to={`/shops/${shop._id}`} style={{ textDecoration: 'none', padding: '25px', color: 'grey' }}>
                                    <img src={shop.imageUrl} alt='shopImage' style={{ height: '75px', borderRadius: '5px' }} />
                                    <h2>{shop.shopName}</h2>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ShopList;