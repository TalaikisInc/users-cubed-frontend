import React from 'react'

import Page from '../../components/page'
import { COMPANY, UPDATE_FREQUENCY, DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'

const Disclaimer = () => (
  <Page title={t('disclaimer')} description={DESCRIPTIONS.disclaimer} path="/disclaimer">
    <ol>
      <ol>
        <li>{ COMPANY } makes no warranty or representation that this website will meet your requirements, that it will be of satisfactory quality, that it will be fit for a particular purpose, that it will not infringe the rights of third parties, that it will be compatible with all systems, that it will be secure and that all information provided will be accurate. We make no guarantee of any specific results from the use of this website.</li>
        <li>No part of this website is intended to constitute advice and the content of this website should not be relied upon when making any decisions or taking any action of any kind.</li>
        <li>No part of this website is intended to constitute a contractual offer capable of acceptance. No goods and / or services are sold through this website and product and / or service details are provided for information purposes only.</li>
        <li>Whilst every effort has been made to ensure that all graphical representations of products and / or descriptions of services available from { COMPANY } correspond to the actual products and / or services, { COMPANY } is not responsible for any variations from these descriptions.</li>
        <li>{ COMPANY } does not represent or warrant that such products and / or services will be available from us or our premises. For this reason, please contact us prior to visiting if you wish to enquire as to the availability of any products and / or services. Any such enquiry does not give rise to any express or implied warranty that the products and / or services forming the subject matter of your enquiry will be available upon your arrival at our premises.</li>
        <li>All pricing information on the website is correct at the time of going online. { COMPANY } reserves the right to change prices and alter or remove any special offers from time to time and as necessary. All pricing information is reviewed and updated every { UPDATE_FREQUENCY } .</li>
      </ol>
    </ol>
  </Page>
)

export default Disclaimer
