import React from 'react'
import PropTypes from 'prop-types'
import { Button, Columns } from 'react-bulma-components'

const Submit = ({ label, loading }) => (
  <Columns>
    <Columns.Column size={12}>
      <Button color="primary" loading={loading} rounded>{ label }</Button>
    </Columns.Column>
  </Columns>
)

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Submit
