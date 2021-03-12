import React from 'react';
import { getShop, uploadFile, addProduct, updateShop } from '../api';


function AddProduct({ match, history }) {
    const productNameRef = React.useRef();
    const priceRef = React.useRef();
    const descriptionRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();
    const [shop, setShop] = React.useState();
    const shopId = match.params.shopId;

    React
        .useEffect(() => {
            getShop(shopId)
                .then((response) => {
                    setShop(response.data);
                });
        }, []);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        uploadFile(uploadData)
            .then((response) => {
                const newProduct = {
                    name: productNameRef.current.value,
                    imageUrl: response.data.fileUrl,
                    ownedBy: shopId,
                    price: priceRef.current.value,
                    description: descriptionRef.current.value
                }

                addProduct(newProduct)
                    .then((response) => {
                        let tempArray = [...shop.productList];
                        tempArray.push(response.data._id);
                        let updatedShop = {
                            _id: shopId,
                            shopName: shop.username,
                            imageUrl: shop.imageUrl,
                            productList: tempArray
                        }
                        updateShop(updatedShop)
                            .then(() => {
                                history.push(`/shops/${shopId}`);
                            })
                    });
            });

    };

    const handleFileChange = (event) => {
        setImageUrl(event.target.files[0]);
    };

    return (
        <>
            <div className='flex-div' style={{ flexDirection: 'column', alignItems: 'center', margin: '50px'}}>
                <form onSubmit={handleFormSubmit} encType='multipart/form-data' style={{ width: '500px' }}>
                    <div className="form-group">
                        <label >Item name</label>
                        <input type="text" className="form-control" ref={productNameRef} />
                    </div>

                    <div className="form-group">
                        <label >Price (in credits)</label>
                        <input type="text" className="form-control" ref={priceRef} />
                    </div>

                    <div className="form-group">
                        <label >Description</label>
                        <input type="text" className="form-control" ref={descriptionRef} />
                    </div>

                    <div className="form-group">
                        <label >Product image</label>
                        <input type='file' className="form-control" name='imageUrl' onChange={handleFileChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Add product</button>
                </form>
            </div>
        </>
    )

}

export default AddProduct;