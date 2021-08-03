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

const JWT_KEY = 'PRISMA_DEMO_AUTH_JWT_KEY'

export const encode = (user, options = {}): string =>
  jwt.sign(tokenDataTranslater(user), JWT_KEY, { ...options })
export const decode = (token, options = {}): TokenUser => {
  try {
    return jwt.verify(token, JWT_KEY, options)
  } catch (error) {
    throw new AuthenticationError('签名失效，请重新登录', {
      error,
    })
  }
}

export const authChecker = (
  { root, args, context, info },
  roles = [],
): boolean => {
  let currentUser = null
  if (context.token) {
    currentUser = decode(context.token)
  }
  context.currentUser = currentUser
  const role = currentUser?.role

  // @Authorized() 登陆后可请求
  if (role === undefined) {
    throw new ForbiddenError('请先登陆')
  }

  if (roles.length === 0) {
    return true
  } else if (roles.includes(role)) {
    return true
  }

  throw new ForbiddenError('当前用户没有权限', {
    roles,
    currentRole: role,
  })
}
