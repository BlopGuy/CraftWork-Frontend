import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import { loggedin } from './api';
import React from 'react';
import Login from './components/Login';
import Signup from './components/SignUp';
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
      </Switch>
    </div>
  )
}

export default App;