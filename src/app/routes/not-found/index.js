import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import { t } from '../../../translations'
import { setLanguage, getLanguage, setError } from '../../../modules/auth'

class NotFound extends PureComponent {
  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  render () {
    return (
      <Page path="/not-found" title={t('not_found')} noCrawl>
        <p>{t('not_found_text')}</p>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.auth.locale
})

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: () => dispatch(getLanguage()),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
