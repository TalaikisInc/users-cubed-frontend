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

const ConfirmReset = Loadable({
  loader: () => import(/* webpackChunkName: "confirm-reset" */ './confirm-reset'),
  loading: () => null,
  modules: ['confirm-reset']
})

const ReportCertTransparency = Loadable({
  loader: () => import(/* webpackChunkName: "report-cert-transparency" */ './report-cert-transparency'),
  loading: () => null,
  modules: ['report-cert-transparency']
})

const XSSReport = Loadable({
  loader: () => import(/* webpackChunkName: "xss-report" */ './xss-report'),
  loading: () => null,
  modules: ['xss-report']
})

const Refer = Loadable({
  loader: () => import(/* webpackChunkName: "refer" */ './refer'),
  loading: () => null,
  modules: ['refer']
})

const ReferUse = Loadable({
  loader: () => import(/* webpackChunkName: "refer-use" */ './refer-use'),
  loading: () => null,
  modules: ['refer-use']
})

export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/about" component={About} />
    <Route exact path="/about/:locale" component={About} />
    <Route exact path="/contact-us" component={ContactUs} />
    <Route exact path="/contact-us/:locale" component={ContactUs} />
    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/privacy-policy/:locale" component={PrivacyPolicy} />
    <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
    <Route exact path="/terms-and-conditions/:locale" component={TermsAndConditions} />
    <Route exact path="/disclaimer" component={Disclaimer} />
    <Route exact path="/disclaimer/:locale" component={Disclaimer} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/signup/:locale" component={Signup} />
    <Route exact path="/signed-out" component={SignedOut} />
    <Route exact path="/signed-out/:locale" component={SignedOut} />
    <Route exact path="/profile-deleted" component={ProfileDeleted} />
    <Route exact path="/profile-deleted/:locale" component={ProfileDeleted} />
    <Route exact path="/reset" component={Reset} />
    <Route exact path="/reset/:locale" component={Reset} />
    <Route exact path="/confirm" component={Confirm} />
    <Route exact path="/confirm/:token" component={Confirm} />
    <Route exact path="/confirm/:token/:locale" component={Confirm} />
    <Route exact path="/refer-use/:token" component={ReferUse} />
    <Route exact path="/refer-use/:token/:locale" component={ReferUse} />
    <Route exact path="/confirm-reset" component={ConfirmReset} />
    <Route exact path="/confirm-reset/:token" component={ConfirmReset} />
    <Route exact path="/confirm-reset/:token/:locale" component={ConfirmReset} />
    <Route exact path="/report-cert-transparency/:locale" component={ReportCertTransparency} />
    <Route exact path="/xss-report/:locale" component={XSSReport} />
    <UnauthenticatedRoute exact path="/signin" component={Signin} />
    <UnauthenticatedRoute exact path="/signin/:locale" component={Signin} />
    <AuthenticatedRoute exact path="/refer" component={Refer} />
    <AuthenticatedRoute exact path="/refer/:locale" component={Refer} />
    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
    <AuthenticatedRoute exact path="/dashboard/:locale" component={Dashboard} />
    <AuthenticatedRoute exact path="/profile-edit" component={ProfileEdit} />
    <AuthenticatedRoute exact path="/profile-edit/:locale" component={ProfileEdit} />
    <Route component={NotFound} />
  </Switch>
)
