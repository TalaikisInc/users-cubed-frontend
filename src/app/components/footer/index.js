import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Content, Hero, Footer, Columns, Navbar } from 'react-bulma-components'

import SelectLanguage from '../select-language'

const CubedFooter = ({ company, ...rest }) => {
  return (
    <Hero.Footer>
      <Footer>
        <Container>
          <Columns>
            <Columns.Column size={3}>
              <Link to="/"><strong>Home</strong></Link>
              <br />
              <Link to="/about">About</Link>
              <br />
              <Link to="/privacy-policy">Privacy Policy</Link>
              <br />
              <Link to="/disclaimer">Disclaimer</Link>
              <br />
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </Columns.Column>
            <Columns.Column size={3}>
            </Columns.Column>
            <Columns.Column size={3}>
            </Columns.Column>
            <Columns.Column size={3}>
              <Link to="/contact-us"><strong>Contact Us</strong></Link>
              <Navbar.Item>
                <SelectLanguage {...rest}/>
              </Navbar.Item>
            </Columns.Column>
          </Columns>
          <Content style={{ textAlign: 'center' }}>
            <p>
              &copy; { new Date().getFullYear() }, <strong><Link to="/">{ company }</Link></strong>
            </p>
          </Content>
        </Container>
      </Footer>
    </Hero.Footer>
  )
}

CubedFooter.propTypes = {
  company: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CubedFooter
