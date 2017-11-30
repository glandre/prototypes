/*
 * Products Actions
 */

import {
  LOAD_SUBSCRIPTIONS,
  LOAD_SUBSCRIPTIONS_SUCCESS,
  LOAD_SUBSCRIPTIONS_ERROR,
  CREATE_HOSTED_PAGES,
  CREATE_HOSTED_PAGES_SUCCESS,
  CREATE_HOSTED_PAGES_ERROR,
} from './constants';

/**
 * Load the subscriptions, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_SUBSCRIPTIONS
 */
export function loadSubscriptions() {
  console.log('ACTION LOAD_SUBSCRIPTIONS!')
  return {
    type: LOAD_SUBSCRIPTIONS,
  };
}

/**
 * Dispatched when the subscriptions are loaded by the request saga
 *
 * @param  {array} subscriptions The subscriptions data
 *
 * @return {object}      An action object with a type of LOAD_SUBSCRIPTIONS_SUCCESS passing the repos
 */
export function subscriptionsLoaded(payload) {
  console.log('ACTION - subscriptionsLoaded:', payload)
  return {
    type: LOAD_SUBSCRIPTIONS_SUCCESS,
    payload
  };
}

/**
 * Dispatched when loading the subscriptions fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_SUBSCRIPTIONS_ERROR passing the error
 */
export function subscriptionsLoadingError(error) {
  return {
    type: LOAD_SUBSCRIPTIONS_ERROR,
    error
  };
}



/**
 * Load the hostedPages, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_SUBSCRIPTIONS
 */
export function createHostedPage() {
  console.log('ACTION CREATE_HOSTED_PAGES!')
  return {
    type: CREATE_HOSTED_PAGES,
  };
}

/**
 * Dispatched when the hostedPages are loaded by the request saga
 *
 * @param  {array} hostedPages The hostedPages data
 *
 * @return {object}      An action object with a type of CREATE_HOSTED_PAGES_SUCCESS passing the repos
 */
export function hostedPageCreated(payload) {
  console.log('ACTION - hostedPageCreated:', payload)
  return {
    type: CREATE_HOSTED_PAGES_SUCCESS,
    payload
  };
}

/**
 * Dispatched when loading the hostedPages fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of CREATE_HOSTED_PAGES_ERROR passing the error
 */
export function hostedPageCreatingError(error) {
  return {
    type: CREATE_HOSTED_PAGES_ERROR,
    error
  };
}
