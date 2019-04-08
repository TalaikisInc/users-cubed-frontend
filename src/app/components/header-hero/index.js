import React, { Fragment } from 'react'
import { Navbar, Container, Columns, Hero, Content } from 'react-bulma-components'

import Logo from '../logo'
import Navlink from '../navlink'
import Signout from '../signout'

const HeaderHero = ({ isAuthenticated, current }) => (
  <Hero color="primary">
    <Navbar>
      <Logo />
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="/products">Products</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          { !isAuthenticated ? <Fragment>
            <Navlink link="/signin" title="Sign In" icon="sign-in-alt" current={current} />
            <Navlink link="/signup" title="Sign Up" icon="sign-out-alt" current={current} primary />
          </Fragment>
            : <Fragment>
              <Navlink link="/dashboard" title="" icon="user" current={current} />
              <Signout />
            </Fragment>
          }
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
    <Hero.Body>
      <Columns>
        <Columns.Column size={12}>
          <Container>
            <Content>
              <i className="is-large fab fa-discord"></i>
              <i className="is-large fas fa-code"></i>
              <h1 className="title">Users <sup>3</sup></h1>
              <h3 className="subtitle">
                Subtitle
              </h3>
              <a href="/">
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>Github</span>
              </a>
            </Content>
          </Container>
        </Columns.Column>
      </Columns>
    </Hero.Body>
  </Hero>
)

export default HeaderHero
