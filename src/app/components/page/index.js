import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Section, Container, Columns, Content, Heading } from 'react-bulma-components'

import Meta from '../meta'

class Page extends Component {
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
