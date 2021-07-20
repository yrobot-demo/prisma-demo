import { Resolver, Query, Ctx, Arg, ObjectType, Field } from 'type-graphql';
import { AuthenticationError } from 'apollo-server';
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

const pickUserInfo = ({ email, name, role, id }) => ({
  // email,
  name,
  role,
  id,
});

@ObjectType()
class UserInfo {
  @Field()
  name: string;
  @Field()
  email: string;
}

@ObjectType()
class LoginReponse {
  @Field()
  token: string;

  @Field((type) => UserInfo)
  user: UserInfo;
}

@Resolver()
export class LoginResolver {
  @Query(() => LoginReponse)
  async login(
    @Ctx() { prisma },
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginReponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user?.password === password)
      return {
        user: user,
        token: encode(pickUserInfo(user)),
      };
    throw new AuthenticationError('No such account or The password error');
  }
}
