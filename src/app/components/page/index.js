import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Section, Container, Columns, Content, Heading } from 'react-bulma-components'
import ReactGA from 'react-ga'

import Meta from '../meta'
import { PROD, GA_TRACKING_ID } from '../../../config'

class Page extends Component {
  initGA () {
    ReactGA.initialize(GA_TRACKING_ID)
    // console.log('Initialized')
  }

  logPageView () {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
    // console.log(`Logged: ${window.location.pathname}`)
  }

  componentDidMount () {
    if (PROD) {
      if (!window.GA_INITIALIZED) {
        this.initGA()
        window.GA_INITIALIZED = true
      }
      this.logPageView()
    }
  }

  render () {
    const { children, ...rest } = this.props

    return (
      <Fragment>
        <Meta {...rest} />
        <Section>
          <Container>
            <Columns>
              <Columns.Column size={3}>
              </Columns.Column>
              <Columns.Column size={6}>
                <Heading size={2}>
                  { rest.title }
                </Heading>
                <Content>
                  { children }
                </Content>
              </Columns.Column>
              <Columns.Column size={3}>
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      </Fragment>
    )
  }
}

export default withRouter(Page)
