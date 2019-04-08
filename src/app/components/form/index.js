import React from 'react'
import { Columns } from 'react-bulma-components'
import PropTypes from 'prop-types'

const Form = ({ children, onSubmit }) => (
  <Columns>
    <Columns.Column size={6}>
      <form onSubmit={onSubmit}>
        { children }
      </form>
    </Columns.Column>
  </Columns>
)

Form.propTypes = {
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Form