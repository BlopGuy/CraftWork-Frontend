import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_CRAFTWORK_API}/api`;

//Shop Routes

export const getAllShops = () => {
    return axios.get(`${baseUrl}/shops`);
}

export const getShop = (id) => {
    return axios.get(`${baseUrl}/shops/${id}`);
}

export const addShop = (shop) => {
    return axios.post(`${baseUrl}/shops`, shop);
}

export const deleteShop = (id) => {
    return axios.delete(`${baseUrl}/shops/${id}`);
}

export const updateShop = (updatedShop) => {
    return axios.put(`${baseUrl}/shops/${updatedShop._id}`, updatedShop);
}

//User Router

export const getUser = (id) => {
    return axios.get(`${baseUrl}/users/${id}`);
}

export const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/users/${id}`);
}

export const updateUser = (updatedUser) => {
    return axios.put(`${baseUrl}/users/${updatedUser._id}`, updatedUser);
}

//Product Routes

export const getAllProducts = () => {
    return axios.get(`${baseUrl}/products`);
}

export const getProduct = (id) => {
    return axios.get(`${baseUrl}/products/${id}`);
}

export const addProduct = (product) => {
    return axios.post(`${baseUrl}/products`, product);
}

export const deleteProduct = (id) => {
    return axios.delete(`${baseUrl}/products/${id}`);
}

export const updateProduct = (updatedProduct) => {
    return axios.put(`${baseUrl}/products/${updatedProduct._id}`, updatedProduct);
}

//Auth Routes

export const signup = (username, password) => {
    return axios.post(`${baseUrl}/signup`, {username, password})
}

export const login = (username, password) => {
    return axios.post(`${baseUrl}/login`, {username, password}, {withCredentials: true})
}

export const logout = () => {
    return axios.post(`${baseUrl}/logout`, null, {withCredentials: true})
}

export const loggedin = () => {
    return axios.get(`${baseUrl}/loggedin`, {withCredentials: true})
}

export const uploadFile = (uploadData) => {
    return axios.post(`${baseUrl}/upload`, uploadData);
}

export const getFox = () => {
    return axios.get('https://randomfox.ca/floof/?ref=apilist.fun');
}

