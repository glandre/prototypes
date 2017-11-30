/*
 * ProductsReducer
 *
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  LOAD_PRODUCTS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  products: [],
});

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      // Delete prefixed '@' from the github username
      return state
        .set('products', action.payload);
    default:
      return state;
  }
}

export default productsReducer;
