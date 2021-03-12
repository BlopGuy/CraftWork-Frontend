import React from 'react';
import { getShop, deleteShop, uploadFile, updateShop } from '../api';
import { Link } from 'react-router-dom';


function EditShop({ match, history }) {
    const [shop, setShop] = React.useState({});
    const [imageUrl, setImage] = React.useState();
    const shopNameRef = React.useRef();
    const userId = match.params.userId;
    const shopId = match.params.shopId;


    React
        .useEffect(() => {
            getShop(shopId)
                .then((response) => {
                    setShop(response.data);
                    console.log(response.data);
                    console.log(shop);
                });
        }, []);

    const handleDeleteShop = () => {
        deleteShop(shopId)
            .then(() => {
                history.push(`/profile/${userId}`);
            });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (imageUrl !== null) {
            const uploadData = new FormData();
            uploadData.append('file', imageUrl);

            uploadFile(uploadData)
                .then((response) => {
                    const updatedShop = {
                        _id: shop._id,
                        shopName: shopNameRef.current.value,
                        imageUrl: response.data.fileUrl,
                        productList: shop.productList,
                        ownedBy: shop.ownedBy
                    }

                    updateShop(updatedShop)
                        .then(() => {
                            history.push(`/profile/${userId}/shop/${shopId}`);
                        });
                });
        } else {
            const updatedShop = {
                _id: shop._id,
                shopName: shopNameRef.current.value,
                imageUrl: shop.imageUrl,
                productList: shop.productList,
                ownedBy: shop.ownedBy
            }

            updateShop(updatedShop)
                .then(() => {
                    history.push(`/profile/${userId}/shop/${shopId}`);
                });
        }

    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };


    return shop.shopName ? (
        <>
            <div className='flex-div' style={{ marginTop: '5%', justifyContent: 'center' }}>
                <div>
                    <div>
                        <img src={shop.imageUrl} alt='Insert Image' style={{ width: '175px', borderRadius: '15px', margin: '50px' }} />
                        <h2>{shop.shopName}</h2>
                    </div>
                </div>
                <div className='flex-div' style={{ flexDirection: 'column', margin: '50px' }}>
                    <form onSubmit={handleFormSubmit} encType='multipart/form-data' style={{ width: '500px' }}>
                        <div className="form-group">
                            <label >Shop name</label>
                            <input type="text" className="form-control" placeholder="update your shop's name" ref={shopNameRef} />
                        </div>

                        <div className="form-group">
                            <label >Shop picture</label>
                            <input type='file' className="form-control" name='imageUrl' onChange={handleFileChange} />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{margin: '50px'}}>Submit</button>
                    </form>
                    <div className='flex-div' style={{ justifyContent: 'center', marginTop: '200px' }}>
                        <Link to={`/profile/${userId}/shop/${shopId}/additem`}>
                            <button className='btn btn-primary'>Add a product</button>
                        </Link>
                        <div>
                            <button onClick={handleDeleteShop}  className="btn btn-danger">Close Shop</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : <p>Loading...</p>

}

export default EditShop;