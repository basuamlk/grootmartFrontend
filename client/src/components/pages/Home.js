import { CssBaseline } from '@material-ui/core';
import React from 'react';
import useStyles from './homeStyles';

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
    </div>
  );
};

export default Home;
