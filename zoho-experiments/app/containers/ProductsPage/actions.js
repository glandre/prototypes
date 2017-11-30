/*
 * Products Actions
 */

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from './constants';

/**
 * Load the products, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PRODUCTS
 */
export function loadProducts() {
  console.log('ACTION LOAD_PRODUCTS!')
  return {
    type: LOAD_PRODUCTS,
  };
}

/**
 * Dispatched when the products are loaded by the request saga
 *
 * @param  {array} products The products data
 *
 * @return {object}      An action object with a type of LOAD_PRODUCTS_SUCCESS passing the repos
 */
export function productsLoaded(payload) {
  console.log('ACTION - productsLoaded:', payload)
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload
  };
}

/**
 * Dispatched when loading the products fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PRODUCTS_ERROR passing the error
 */
export function productsLoadingError(error) {
  return {
    type: LOAD_PRODUCTS_ERROR,
    error
  };
}
