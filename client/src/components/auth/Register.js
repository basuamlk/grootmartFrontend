import React, { useState, useContext, useEffect } from 'react';
// import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { withRouter } from 'react-router-dom';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Modal,
  Typography,
  Paper,
} from '@material-ui/core';

const Register = (props) => {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { open, onModalClose } = props;

  useEffect(() => {
    if (isAuthenticated) {
      // redirect in react
      props.history.push('/dashboard');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log('changed')
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('Register Submit');
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
      onModalClose();
    }
  };

  const handleClose = () => {
    onModalClose();
  };

  return (
    <Modal onClose={handleClose} open={open}>
      <Container maxWidth='xs'>
        <CssBaseline />
        <Paper className={classes.paper} color='secondary'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>Sign up</Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='name'
              label='name'
              name='name'
              value={name}
              onChange={onChange}
              autoComplete='name'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              value={email}
              onChange={onChange}
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              value={password}
              onChange={onChange}
              id='password'
              autoComplete='new-password'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password2'
              label='Confirm Password'
              type='password'
              value={password2}
              onChange={onChange}
              id='password2'
              autoComplete='new-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          <Box mt={8}>
            <Typography variant='body2' color='textSecondary' align='center'>
              Copyright &copy; {new Date().getFullYear()} Grootmart, Inc
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
};

export default withRouter(Register);
