import React from 'react';
// import '../../App.css';
import { Link } from 'react-router-dom';
import { Box, Grid, Container, AppBar } from '@material-ui/core';
import useStyles from './footerStyles';

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar color='primary' className={classes.appBar}>
      <Box
        position='static'
        bgcolor='primary.main'
        color='primary.contrastText'
      >
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Links</Box>
              <Box>
                <Link to='/'>Home</Link>
              </Box>
              <Box>
                <Link to='/dashboard'>Dashboard</Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign='center' pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Copyright &copy; {new Date().getFullYear()} Grootmart, Inc
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Footer;
