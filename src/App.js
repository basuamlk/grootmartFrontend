import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import AuthState from './context/auth/AuthState';
import CheckoutState from './context/checkout/CheckoutState';
import ProductState from './context/product/ProductState';
// import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import Cart from './components/cart/Cart';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alert';
import { ThemeProvider } from '@material-ui/core/styles';
import AppTheme from './myThemes/appTheme';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <CheckoutState>
          <ProductState>
            <ThemeProvider theme={AppTheme}>
              <Router>
                <Fragment>
                  <Alerts />
                  <Navbar />
                  <Switch>
                    <Route exact path='/'>
                      <Home />
                    </Route>
                    <PrivateRoute
                      exact
                      path='/dashboard'
                      component={Dashboard}
                    />
                    <PrivateRoute exact path='/cart' component={Cart} />
                    <PrivateRoute exact path='/checkout' component={Checkout} />
                  </Switch>
                </Fragment>
              </Router>
            </ThemeProvider>
          </ProductState>
        </CheckoutState>
      </AlertState>
    </AuthState>
  );
};

export default App;
