import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import AuthenticatedRoute from '../components/authenticated-route'
import UnauthenticatedRoute from '../components/unauthenticated-route'
import NotFound from './not-found'

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './homepage'),
  loading: () => null,
  modules: ['homepage']
})

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './about'),
  loading: () => null,
  modules: ['about']
})

const Disclaimer = Loadable({
  loader: () => import(/* webpackChunkName: "disclaimer" */ './disclaimer'),
  loading: () => null,
  modules: ['disclaimer']
})

const PrivacyPolicy = Loadable({
  loader: () => import(/* webpackChunkName: "privacy-policy" */ './privacy-policy'),
  loading: () => null,
  modules: ['privacy-policy']
})


const TermsOfService = Loadable({
  loader: () => import(/* webpackChunkName: "terms-of-service" */ './terms-of-service'),
  loading: () => null,
  modules: ['terms-of-service']
})

const SignedOut = Loadable({
  loader: () => import(/* webpackChunkName: "signed-out" */ './signed-out'),
  loading: () => null,
  modules: ['signed-out']
})

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard'),
  loading: () => null,
  modules: ['dashboard']
})

const Signin = Loadable({
  loader: () => import(/* webpackChunkName: "signin" */ './signin'),
  loading: () => null,
  modules: ['signin']
})

const Signout = Loadable({
  loader: () => import(/* webpackChunkName: "signout" */ './signout'),
  loading: () => null,
  modules: ['signout']
})

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile'),
  loading: () => null,
  modules: ['profile']
})

export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/about" component={About} />
    <Route exact path="/about" component={About} />
    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/terms-of-service" component={TermsOfService} />
    <Route exact path="/disclaimer" component={Disclaimer} />
    <Route exact path="/signed-out" component={SignedOut} />
    <Route exact path="/profile/:id" component={Profile} />
    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
    <UnauthenticatedRoute exact path="/signin" component={Signin} />
    <AuthenticatedRoute exact path="/signout" component={Signout} />
    <Route component={NotFound} />
  </Switch>
)
