import React from 'react'

import Page from '../../components/page'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

const ProfileDeleted = () => (
  <Page title="Profile is Deleted" description={DESCRIPTIONS.profile.deleted} path="/profile-deleted">
    <p>Profile is deleted.</p>
  </Page>
)

export default ProfileDeleted
