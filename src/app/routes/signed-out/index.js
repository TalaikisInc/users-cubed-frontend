import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import Error from '../../components/error'
import { t, setLocale } from '../../translations'

const SignedOut = ({ location }) => (
  <Page title="Signed Out" description={DESCRIPTIONS.signedOut} path="/signed-out">
    { location.state && location.state.error ? <Error msg={location.state.error}/> : <p>You have signed out.</p> }
  </Page>
)

export default SignedOut
