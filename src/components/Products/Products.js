import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './productsStyles';
import Product from './Product/Product';

const Products = ({ products, addToCart }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={4}
      >
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} handleAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
