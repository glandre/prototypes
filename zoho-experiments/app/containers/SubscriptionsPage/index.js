import React from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'

import { Helmet } from 'react-helmet'
import CenteredSection from '../HomePage/CenteredSection'
import Section from '../HomePage/Section'
import Button from '../../components/Button'

import { makeSelectSubscriptions, makeSelectHostedPages } from './selectors'
import { loadSubscriptions, createHostedPage } from './actions'
import reducer from './reducer'
import saga from './saga'

const SubscriptionsPage = (props) => {
  const { subscriptionsData, getSubscriptions, createHostedPage } = props
  const { subscriptions, hostedPage } = subscriptionsData
  console.log('SubscriptionsPage(props):', props)
  console.log('SubscriptionsPage(props.subscriptionsData):', props.subscriptionsData)
  return <article>
    <Helmet>
      <title>Subscriptions Page</title>
      <meta name="description" content="Subscription Call back test" />
    </Helmet>
    <div>
      <CenteredSection>
        <h2>
          Zoho
        </h2>
        <div
          style={{
            display: 'flex'
          }}
        >
          <Button
            onClick={getSubscriptions}
          >
            Get Subscriptions
          </Button>
          <Button
            onClick={createHostedPage}
          >
            Create Hosted Page
          </Button>
        </div>
      </CenteredSection>
      { hostedPage ?
        <Section>
          <h2>
            Active Hosted Page:
          </h2>
          <a style={{ fontSize: 12 }} href={hostedPage.url}>{hostedPage.hostedpage_id}</a>
        </Section>
      : null }
      { subscriptions.length ?
        <Section>
          <h2>
            Subscriptions List
          </h2>
          <ul>
            {subscriptions.map(({customer_name, name, status}, i) => 
              <li key={i}>{`[status: ${status}] - ${name} - Customer: ${customer_name}`} - <a onClick={createHostedPage}>Create Hosted Page</a></li>
            )}
          </ul>
        </Section>
      : null }
    </div>
  </article>
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    getSubscriptions: () => {
      dispatch(loadSubscriptions());
    },
    createHostedPage: () => {
      dispatch(createHostedPage());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  subscriptionsData: makeSelectSubscriptions()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'subscriptions', reducer });
const withSaga = injectSaga({ key: 'subscriptions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SubscriptionsPage);
