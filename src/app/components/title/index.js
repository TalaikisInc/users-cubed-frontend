import React from 'react'
import PropTypes from 'prop-types'
import { Container, Heading, Section, Hero } from 'react-bulma-components'

const Title = ({ title, subtitle }) => (
  <Section>
    <Hero color="info" renderAs="header">
      <Hero.Body>
        <Container>
          <Heading>{ title }</Heading>
          <Heading subtitle size={3}>
            { subtitle }
          </Heading>
        </Container>
      </Hero.Body>
    </Hero>
  </Section>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default Title
