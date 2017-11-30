const { create } = require('apisauce')
const config = require('../config')

const { domainUrl, authtoken, organiztionId, localhost } = config

const api = create({
  baseURL: `https://${domainUrl}/api/v1/`,
  headers: {
    'Authorization': `Zoho-authtoken ${authtoken}`
  }
})

module.exports = {
  createHostedPage: () => api.post('hostedpages/newsubscription', {
    plan: {
      plan_code: 'monthly-plan'
    },
    starts_at: '2017-12-15',
    reference_id: 'bowmanfurniture',
    additional_param: 'subscription_create',
    redirect_url: 'http://localhost:3000/subscription-success'
  }),
  listOrganizations: () => api.get('organizations'),
  listSubscriptions: () => api.get('subscriptions?filter_by=SubscriptionStatus.All'),
  listProducts: () => api.get('products?filter_by=ProductStatus.All')
}