import { AuthenticationError, ForbiddenError } from 'apollo-server'
const jwt = require('jsonwebtoken')

export interface TokenUser {
  name: string
  role: string
  id: number
}

const tokenDataTranslater = ({ email, name, role, id }): TokenUser => ({
  // email,
  name,
  role,
  id,
})

const JWT_KEY = 'auth_server_JWT_key'

export const encode = (user, options = {}): string =>
  jwt.sign(tokenDataTranslater(user), JWT_KEY, { ...options })
export const decode = (token, options = {}): TokenUser => {
  try {
    return jwt.verify(token, JWT_KEY, options)
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const authChecker = (
  { root, args, context, info },
  roles = [],
): boolean => {
  const role = context.currentUser?.role

  // @Authorized() 登陆后可请求
  if (role === undefined) {
    throw new ForbiddenError('Please login first')
  }

  if (roles.length === 0) {
    return true
  } else if (roles.includes(role)) {
    return true
  }

  throw new ForbiddenError('Permission denied')
}
