import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

const ProfileDeleted = () => (
  <Page title={t('profile_deleted')} description={DESCRIPTIONS.profile.deleted} path="/profile-deleted">
    <p>{t('profile_deleted_text')}</p>
  </Page>
)

export default ProfileDeleted
