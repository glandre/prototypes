/**
 * Products page selectors
 */

import { createSelector } from 'reselect';

const selectProducts = (state) => state.get('products');

const makeSelectProducts = () => createSelector(
  selectProducts,
  (productsState) => productsState.toJS()
);

export {
  selectProducts,
  makeSelectProducts
};
