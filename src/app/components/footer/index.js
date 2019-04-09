import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Container, Content, Hero, Footer } from 'react-bulma-components'

const CubedFooter = ({ company }) => {
  return (
    <Hero.Footer>
      <Footer>
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <p>
              &copy; { new Date().getFullYear() }, <strong><Link to="/">{ company }</Link></strong> |&nbsp;
              <Link to="/privacy-policy">Privacy Policy</Link> |&nbsp;
              <Link to="/disclaimer">Disclaimer</Link> |&nbsp;
              <Link to="/terms-and-conditions">Terms and Conditions</Link> |&nbsp;
              <Link to="/contact-us">Contact Us</Link>
            </p>
          </Content>
        </Container>
      </Footer>
    </Hero.Footer>
  )
}

CubedFooter.propTypes = {
  company: PropTypes.string.isRequired
}

export default CubedFooter
