import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
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
  Typography,
  Modal,
  Paper,
} from '@material-ui/core';

const Login = (props) => {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { open, onModalClose } = props;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
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
          <Typography variant='h5'>Sign in</Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
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
              autoComplete='current-password'
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

export default withRouter(Login);
