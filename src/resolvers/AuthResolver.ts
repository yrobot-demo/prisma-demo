import { Resolver, Query, Ctx, Arg, ObjectType, Field } from 'type-graphql';
import { AuthenticationError } from 'apollo-server';

import { encode } from '../auth';

@ObjectType()
class UserInfo {
  @Field()
  name: string;
  @Field()
  email: string;
}

@ObjectType()
class Login {
  @Field()
  token: string;
  @Field((type) => UserInfo)
  user: UserInfo;
}

@Resolver()
export default class AuthResolver {
  @Query(() => Login)
  async login(@Ctx() { prisma }, @Arg('email') email: string, @Arg('password') password: string): Promise<Login> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user?.password === password)
      return {
        user: user,
        token: encode(user),
      };
    throw new AuthenticationError('No such account or the password error');
  }
}
