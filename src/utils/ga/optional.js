import isPresent from './isPresent'

export class Optional {
  constructor (value) {
    this.value = value
    this.name = undefined
  }

  map (mapFunction) {
    if (this.isPresent()) {
      const mapped = mapFunction(this.value)
      if (Optional.present(mapped)) {
        return new Optional(mapped, this.name)
      }
    }
    return new Optional(undefined, this.name)
  }

  when (consumeFunction) {
    if (this.isPresent()) {
      consumeFunction(this.value)
    }
  }

  filter (filterFunction) {
    if (this.isPresent() && filterFunction(this.value)) {
      return new Optional(this.value)
    }

    return new Optional(undefined, this.name)
  }

  get () {
    if (this.isPresent()) {
      return this.value
    } else {
      throw new Error('The value is undefined')
    }
  }

  getOrElse (value) {
    if (this.isPresent()) {
      return this.value
    }

    return value
  }

  getOrUndefined () {
    if (this.value === null) {
      return undefined
    }

    return this.value
  }

  getOrNull () {
    if (this.value === null) {
      return null
    }

    return this.value
  }

  isPresent () {
    return this.value !== undefined && this.value !== null
  }

  validateString () {
    return this.validateTypeof('string')
  }

  validateBoolean () {
    return this.validateTypeof('boolean')
  }

  validateNumber () {
    return this.validateTypeof('number')
  }

  validateTypeof (typeOf) {
    if (this.isPresent() && typeof this.value === typeOf) {
      return this
    }

    return Optional.empty()
  }

  static of (value, name) {
    return new Optional(value, name)
  }

  static first (...values) {
    for (const value of values) {
      let val
      if (value instanceof Optional) {
        val = value.getOrUndefined()
      } else {
        val = value
      }

      if (isPresent(val)) {
        return Optional.of(val)
      }
    }

    return Optional.empty()
  }

  static empty (name) {
    return new Optional(undefined, name)
  }

  static present (obj) {
    return obj !== undefined && obj !== null
  }
}
