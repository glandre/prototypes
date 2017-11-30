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
  LOAD_SUBSCRIPTIONS_SUCCESS,
  CREATE_HOSTED_PAGES_SUCCESS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  subscriptions: [],
  hostedPage: null
});

function subscriptionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SUBSCRIPTIONS_SUCCESS:
      // Delete prefixed '@' from the github username
      return state
        .set('subscriptions', action.payload);
    case CREATE_HOSTED_PAGES_SUCCESS:
      // Delete prefixed '@' from the github username
      return state
        .set('hostedPage', action.payload);
    default:
      return state;
  }
}

export default subscriptionsReducer;
