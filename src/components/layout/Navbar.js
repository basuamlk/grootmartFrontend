import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Register from '../auth/Register';
import AuthContext from '../../context/auth/authContext';
import Login from '../auth/Login';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './navStyles';
import logo from '../../assets/groot.png';
import ProductContext from '../../context/product/productContext';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Navbar = ({ icon, title }) => {
  const productContext = useContext(ProductContext);
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [regBtnPress, setRegBtnPress] = useState(false);

  const { isAuthenticated, logout, user } = authContext;
  const { cart } = productContext;

  const onLogout = () => {
    logout();
  };

  // Open or Close Modal

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginOpen = () => {
    setOpen(true);
    setRegBtnPress(false);
  };

  const handleRegisterOpen = () => {
    setOpen(true);
    setRegBtnPress(true);
  };

  //Hide or Show logout
  const authLinks = (
    <div className='authLinks'>
      Hello, {user && user.name}
      <Button onClick={onLogout}>
        Logout
        <ExitToAppIcon />
      </Button>
      <IconButton
        component={Link}
        to='/cart'
        aria-label='Show cart items'
        color='inherit'
      >
        <Badge badgeContent={cart.total_items} color='secondary'>
          <ShoppingCart />
        </Badge>
      </IconButton>
    </div>
  );

  const guestLinks = (
    <div>
      <IconButton color='inherit' onClick={handleRegisterOpen}>
        Sign Up
      </IconButton>

      <IconButton color='inherit' onClick={handleLoginOpen}>
        Login
      </IconButton>
    </div>
  );

  return (
    <AppBar position='fixed' className={classes.appbar} color='primary'>
      <Toolbar>
        <Typography
          varient='h6'
          className={classes.title}
          color='textSecondary'
        >
          <Link to='/'>
            <img
              src={logo}
              alt={title}
              height='25px'
              className={classes.image}
            />
            {title}
          </Link>
        </Typography>
        <div className={classes.grow} />
        <div className={classes.button}>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        {regBtnPress ? (
          <Register open={open} onModalClose={handleClose} />
        ) : (
          <Login open={open} onModalClose={handleClose} />
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.defaultProps = {
  title: 'Grootmart',
  icon: 'brand-logo',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
