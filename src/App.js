import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import { loggedin } from './api';
import React from 'react';
import Login from './components/Login';
import Signup from './components/SignUp';
import ShopList from './components/ShopList';
import ShopDetails from './components/ShopItems';
import ProductDetails from './components/ItemDetails';
import Profile from './components/Profile';
import AddShop from './components/addShop';
import Cart from './components/Cart';
import EditShop from './components/EditShop';
import AddProduct from './components/AddItems';
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';

function App() {
  const [loggedInUser, setloggedInUser] = React.useState(null);
 

  const setCurrentUser = (user) => {
    setloggedInUser(user);
  };

  React
    .useEffect(() => {
      if (loggedInUser === null) {
        loggedin()
          .then((response) => {
            if (response.data._id) {
              setCurrentUser(response.data);
            }
          });
      }
    });

 

  return (
    <div className="App">
      <ToastContainer />
      <NavBar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' render={
          (props) => {
            return <Login {...props} setCurrentUser={setCurrentUser} />
          }}
        />
        <Route exact path='/signup' render={
          (props) => {
            return <Signup {...props} />
          }}
        />
        <Route exact path='/login-google' render={
          () => {
            window.location.href = `${process.env.CRAFTWORK_API}/api/auth/google`;
          }
        }
        />
        <Route exact path='/shops' component={ShopList} />
        <Route exact path='/shops/:shopId' component={ShopDetails} />
        <Route exact path='/shops/:shopId/products/:productId' render={
          (props) => {
            return <ProductDetails {...props} loggedInUser={loggedInUser} />
          }
        }
        />
        {/* <Route exact path='/profile/:userId' component={Profile} />
        <Route exact path='/profile/:userId/shop/add' component={AddShop} />
        <Route exact path='/profile/:userId/shop/:shopId' component={EditShop} />
        <Route exact path='/profile/:userId/shop/:shopId/additem' component={addProduct} /> */}
        <PrivateRoute exact path='/profile/:userId' loggedInUser={loggedInUser} component={(props) => {
            return <Profile {...props} />
          }}/>
        <PrivateRoute exact path='/profile/:userId/shop/add' loggedInUser={loggedInUser} component={(props) => {
            return <AddShop {...props} />
          }}/>
        <PrivateRoute exact path='/profile/:userId/shop/:shopId' loggedInUser={loggedInUser} component={(props) => {
            return <EditShop {...props} />
          }}/>
        <PrivateRoute exact path='/profile/:userId/shop/:shopId/additem' loggedInUser={loggedInUser} component={(props) => {
            return <AddProduct {...props} />
          }}/>
        <PrivateRoute exact path='/cart/:userId' loggedInUser={loggedInUser} component={(props) => {
            return <Cart {...props} />
          }}/>
      </Switch>
    </div>
  )
}

export default App;