import ua from 'universal-analytics'

import { isServer } from '../../store'
import { GA, DEBUG } from '../../config'
import { CIDs } from './cid'

const size = !isServer ? window.innerWidth : 'none'
const cid = !isServer ? CIDs.get() : 'none'
const headers = {}
const visitorOptions = {
  cid,
  headers,
  sr: size
}

const visitor = ua(GA, visitorOptions).debug(DEBUG)

export const pageview = (pathname) => visitor.pageview({
  dp: pathname
}).send()

export const event = (category, action, label, value) => visitor.event(category, action, label, value).send()

/*
import React, { Component } from 'react'
import ReactGA from 'react-ga'

export default function withTracker (WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    })
    ReactGA.pageview(page);
  }

  const HOC = class extends Component {
    componentDidMount () {
      const page = this.props.location.pathname
      trackPage(page)
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}
*/
