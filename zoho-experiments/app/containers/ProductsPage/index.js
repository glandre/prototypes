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

import { makeSelectProducts } from './selectors'
import { loadProducts } from './actions'
import reducer from './reducer'
import saga from './saga'

const ProductsPage = (props) => {
  const { data, handleClick } = props
  const { products } = data
  console.log('ProductsPage(props):', props)
  console.log('ProductsPage(props.data):', props.data)
  return <article>
    <Helmet>
      <title>Products Page</title>
      <meta name="description" content="Subscription Call back test" />
    </Helmet>
    <div>
      <CenteredSection>
        <h2>
          Zoho
        </h2>
        <Button
          onClick={handleClick}
        >
          Get Products
        </Button>
      </CenteredSection>
      { products.length ?
        <Section>
          <h2>
            Products List
          </h2>
          <ul>
            {products.map(({product_id, name, description, status}) => 
              <li key={product_id}>{`[${product_id} - ${status}] - ${name}${description ? ' - ' + description : ''}`}</li>
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
    handleClick: () => {
      dispatch(loadProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectProducts(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'products', reducer });
const withSaga = injectSaga({ key: 'products', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductsPage);
