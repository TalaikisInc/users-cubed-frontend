const PROD = process.env.NODE_ENV === 'production'

// Main
export const STORAGE_ID = 'id'
export const URL = 'https://ufunc.com/'
export const IMAGES_URL = 'https://ufunc.com/images/'
export const API_URL = PROD ? 'https://api.ufunc.com/' : 'http://localhost:3000/api'
export const COMPANY_EMAIL = 'info@talaikis.com'
export const DEFAULT_DESCRIPTION = 'Default description of awesome website'
export const DEFAULT_IMAGE = 'default.jpg'
export const TITLE = 'The Company'
export const COMPANY = 'The Company Ltd.'
export const COMPANY_ADDRESS = 'The Company address'
export const DPM_EMAIL = 'privacy@talaikis.com'
export const API_KEY = PROD ? process.env.API_KEY : 'cEPHDFKxwxaL7cAVZFQt'

// Upload
export const UPLOAD_API_URL = PROD ? 'https://upload.talaikis.com/' : 'http://localhost:3000/upload'
export const UPLOAD_API_KEY = PROD ? process.env.UPLOAD_API_KEY : ''

// Contact
export const CONTACT_API_URL = PROD ? 'https://mail.talaikis.com/contactus' : 'http://localhost:3000/contactus'
export const CONTACT_API_KEY = PROD ? process.env.CONTACT_API_KEY : ''

// Third parties
export const GA = 'UA-137539256-1'
export const TWITTER_HANDLE = '@Talaikis'
export const FB_SITE = ''
export const FB_APP_ID = ''
export const GOOGLE_PUB = 'ca-pub-7892370499383985'

// Etc/
export const UPDATE_FREQUENCY = '3 hours'
export const DESCRIPTIONS = {
  homepage: `${COMPANY}'s homepage.`,
  about: `${COMPANY}'s about page.`,
  signin: `${COMPANY}'s signin page.`,
  signup: `${COMPANY}'s signup page.`,
  signedOut: `${COMPANY}'s signed out page.`,
  disclaimer: `${COMPANY}'s disclaimers page.`,
  ToS: `${COMPANY}'s Terms and Conditions page`,
  privacyPolicy: `${COMPANY}'s Privacy policy page`,
  confirm: `${COMPANY}'s account confirmation page`,
  reset: `${COMPANY}'s password reset page.`,
  contactUs: `${COMPANY}'s contact us page.`,
  confirmreset: `${COMPANY}'s password reset confirmation page.`,
  profile: {
    deleted: `${COMPANY}'s profile deletd page.`
  }
}
