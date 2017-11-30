/**
 * Subscriptions page selectors
 */

import { createSelector } from 'reselect';

const selectSubscriptions = (state) => state.get('subscriptions');

const makeSelectSubscriptions = () => createSelector(
  selectSubscriptions,
  (subscriptionsState) => subscriptionsState.toJS()
);

export {
  selectSubscriptions,
  makeSelectSubscriptions,
  makeSelectHostedPages
};
