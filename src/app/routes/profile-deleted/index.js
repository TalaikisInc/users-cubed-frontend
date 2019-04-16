import React, { PureComponent } from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

class ProfileDeleted extends PureComponent {
  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  render () {
    return (
      <Page title={t('profile_deleted')} description={DESCRIPTIONS.profile.deleted} path="/profile-deleted">
        <p>{t('profile_deleted_text')}</p>
      </Page>      
    )
  }
}

export default ProfileDeleted
