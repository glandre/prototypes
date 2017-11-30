import React from 'react'
import { Helmet } from 'react-helmet'
import CenteredSection from '../HomePage/CenteredSection'
import Section from '../HomePage/Section'

const SubscriptionSuccessPage = () => 
  <article>
    <Helmet>
      <title>Subscription Success</title>
      <meta name="description" content="Subscription Call back test" />
    </Helmet>
    <div>
      <CenteredSection>
        <h2>
          Subscription Success
        </h2>
        <p>
          My first paragraph.
        </p>
      </CenteredSection>
      <Section>
        <h2>
          Hello
        </h2>
        Testing testing testing....
      </Section>
    </div>
  </article>

export default SubscriptionSuccessPage