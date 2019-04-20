import { CIDProvider } from './cidProvider'
import { Optional } from './optional'

export class CIDProviders {
  static getInstance () {
    return Optional.of(window.localStorage.getItem('cidProvider')).map(value => new CIDProvider(value)).getOrNull()
  }

  static setInstance (provider) {
    const value = provider.get()
    if (value) {
      window.localStorage.setItem('cidProvider', value)
    }
  }
}
