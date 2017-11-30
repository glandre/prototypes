/**
 * Gets the subscriptions from our backend
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_SUBSCRIPTIONS, CREATE_HOSTED_PAGES } from './constants';
import {
  hostedPageCreated,
  hostedPageCreatingError,
  subscriptionsLoaded,
  subscriptionsLoadingError
} from './actions';

import request from 'utils/request';

/**
 * Get Subscriptions
 */
export function* getSubscriptions() {
  console.log('generator getSubscriptions...')
  const requestURL = `http://localhost:3000/api/zoho/subscriptions`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    console.log('getSubscriptions(data) - after call:', data)
    yield put(subscriptionsLoaded(data.subscriptions));
  } catch (err) {
    console.log('getSubscriptions(err) - after call:', err)
    yield put(subscriptionsLoadingError(err));
  }
}

/**
 * Create HostedPages
 */
export function* createHostedPage() {
  console.log('generator createHostedPage...')
  const requestURL = `http://localhost:3000/api/zoho/new-hosted-page`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    console.log('createHostedPage(data) - after call:', data)
    yield put(hostedPageCreated(data.hostedpage));
  } catch (err) {
    console.log('createHostedPage(err) - after call:', err)
    yield put(hostedPageCreatingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* subscriptionsData() {
  // Watches for actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SUBSCRIPTIONS, getSubscriptions);
  yield takeLatest(CREATE_HOSTED_PAGES, createHostedPage);
}
