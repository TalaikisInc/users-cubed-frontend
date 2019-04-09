import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import AuthenticatedRoute from '../components/authenticated-route'
import UnauthenticatedRoute from '../components/unauthenticated-route'
import NotFound from './not-found'
import withTracker from '../utils/ga'
import { GA } from '../../config'

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


const TermsAndConditions = Loadable({
  loader: () => import(/* webpackChunkName: "terms-and-conditions" */ './terms-and-conditions'),
  loading: () => null,
  modules: ['terms-and-conditions']
})

const SignedOut = Loadable({
  loader: () => import(/* webpackChunkName: "signed-out" */ './signed-out'),
  loading: () => null,
  modules: ['signed-out']
})

const Signup = Loadable({
  loader: () => import(/* webpackChunkName: "signup" */ './signup'),
  loading: () => null,
  modules: ['signup']
})

const ContactUs = Loadable({
  loader: () => import(/* webpackChunkName: "contact-us" */ './contact-us'),
  loading: () => null,
  modules: ['contact-us']
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

const ProfileEdit = Loadable({
  loader: () => import(/* webpackChunkName: "profile-edit" */ './profile-edit'),
  loading: () => null,
  modules: ['profile-edit']
})

const ProfileDeleted = Loadable({
  loader: () => import(/* webpackChunkName: "profile-deleted" */ './profile-deleted'),
  loading: () => null,
  modules: ['profile-deleted']
})

const Reset = Loadable({
  loader: () => import(/* webpackChunkName: "reset" */ './reset'),
  loading: () => null,
  modules: ['reset']
})

const Confirm = Loadable({
  loader: () => import(/* webpackChunkName: "confirm" */ './confirm'),
  loading: () => null,
  modules: ['confirm']
})

export default () => (
  <Switch>
    <Route exact path="/" component={withTracker(Homepage, { userID: GA })} />
    <Route exact path="/about" component={About} />
    <Route exact path="/contact-us" component={ContactUs} />
    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
    <Route exact path="/disclaimer" component={Disclaimer} />
    <Route exact path="/signed-out" component={SignedOut} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/profile-deleted" component={ProfileDeleted} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/reset" component={Reset} />
    <Route exact path="/confirm" component={Confirm} />
    <UnauthenticatedRoute exact path="/signin" component={Signin} />
    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
    <AuthenticatedRoute exact path="/signout" component={Signout} />
    <AuthenticatedRoute exact path="/profile-edit" component={ProfileEdit} />
    <Route component={NotFound} />
  </Switch>
)
