/**
 * Gets the products from our backend
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PRODUCTS } from './constants';
import { productsLoaded, productsLoadingError } from './actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getProducts() {
  console.log('generator getProducts...')
  const requestURL = `http://localhost:3000/api/zoho/products`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    console.log('getProducts(data) - after call:', data)
    yield put(productsLoaded(data.products));
  } catch (err) {
    console.log('getProducts(err) - after call:', err)
    yield put(productsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* productsData() {
  // Watches for LOAD_PRODUCTS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}
