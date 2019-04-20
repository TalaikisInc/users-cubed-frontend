import { v4 as uuid } from 'uuid'

import { CIDProviders } from './cidProviders'
import { Optional } from './optional'
import isPresent from './isPresent'
import { CIDProvider } from './cidProvider'

const KEY = 'ga_cid'

export class CIDs {
  static get () {
    let cid = this.fetch()

    if (!cid) {
      cid = this.create()
    }

    this.set(cid)

    return cid
  }

  static fetch () {
    const mainCID = Optional.of(CIDProviders.getInstance())
      .filter(current => isPresent(current))
      .map(current => current.get())
      .getOrUndefined()

    const localCID = window.localStorage.getItem(KEY)

    return Optional.first(mainCID, localCID).getOrUndefined()
  }

  static set (cid) {
    window.localStorage.setItem(KEY, cid)
    CIDProviders.setInstance(new CIDProvider(cid))
  }

  static create () {
    return uuid()
  }
}
