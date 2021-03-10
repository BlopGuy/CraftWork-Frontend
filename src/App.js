import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import { loggedin } from './api';
import React from 'react';
import Login from './components/Login';
import Signup from './components/SignUp';
import ShopList from './components/ShopList';
import ShopItems from './components/ShopItems';
import ProductDetails from './components/ItemDetails';
import Profile from './components/Profile';
import AddShop from './components/addShop';
import Cart from './components/Cart';
//import PrivateRoute from './components/PrivateRoute';

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
      <NavBar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser} />
      <Switch>
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
        <Route exact path='/profile/:userId/shop/add' component={AddShop} />
        <Route exact path='/shops/:shopId' component={ShopItems} />
        <Route exact path='/shops/:shopId/products/:productId' component={ProductDetails}/>
        <Route exact path='/profile/:userId' component={Profile} />
        <Route exact path='/cart/:userId' component={Cart} />
      </Switch>
    </div>
  )
}

export default App;