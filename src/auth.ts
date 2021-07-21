import { AuthenticationError, ForbiddenError } from 'apollo-server';
const jwt = require('jsonwebtoken');

const JWT_KEY = 'auth_server_JWT_key';

export const encode = (user, options = {}) => jwt.sign(user, JWT_KEY, { ...options });
export const decode = (token, options = {}) => {
  try {
    return jwt.verify(token, JWT_KEY, options);
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

export const tokenDataTranslater = ({ email, name, role, id }) => ({
  // email,
  name,
  role,
  id,
});

export const authChecker = ({ root, args, context, info }, roles) => {
  const role = context?.user?.role;
  if (roles.length === 0 || roles.includes(role)) {
    return true;
  }
  throw new ForbiddenError('Your role is NOT able to call this API');
};
