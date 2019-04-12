import { locale, fallback, set, t } from 'frenchkiss'

import en from './locales/en'
import fr from './locales/fr'

set('fr', fr)
set('en', en)

export const setLocale = (loc) => {
  locale(loc)
}

fallback('en')

export { t }
