import type {Method} from './types'

export class Logger {
  isDate = false

  constructor() {}

  withDate() {
    this.isDate = true

    return this
  }

  withoutDate() {
    this.isDate = false

    return this
  }

  log(message: unknown) {
    return this.#handler('log', message)
  }

  warn(message: unknown) {
    return this.#handler('warn', message)
  }

  error(message: unknown) {
    return this.#handler('error', message)
  }

  group(name: unknown) {
    return this.#handler('group', name)
  }

  groupEnd() {
    return this.#handler('groupEnd')
  }

  #handler(method: Method, message?: unknown) {
    const callArgs = [message]
    if (this.isDate) callArgs.push(this.#createDate())
    this.#call(method, callArgs)
    this.#reset()

    return this
  }

  #createDate() {
    const date = new Date()

    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`
  }

  #call(method: Method, messages: unknown[]) {
    console[method](...messages)
  }

  #reset() {
    this.isDate = false
  }
}
