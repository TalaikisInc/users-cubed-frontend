import { validate } from 'isemail'

export const email = (value) => validate(value) ? undefined : 'Invalid email'

export const required = (value) => (value || typeof value === 'number' ? undefined : 'Required')

export const minLength = (min) => (value) => value && value.length < min ? `Must be ${min} characters or more` : undefined

export const number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const alphaNumeric = (value) => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined
