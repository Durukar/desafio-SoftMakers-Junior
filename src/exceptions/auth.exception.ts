import { GenericError } from './generic.exception'

class AuthException extends GenericError {
  constructor() {
    super(403, 'Invalid credentials')
  }
}

export { AuthException }
