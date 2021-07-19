import 'reflect-metadata';
import { buildSchema, Authorized, Resolver, Query, Ctx, Arg, ObjectType, Field } from 'type-graphql';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { PrismaClient } from '@generated/prisma-client';

import { resolvers, ResolversEnhanceMap, applyResolversEnhanceMap, User } from '@generated/type-graphql';

interface Context {
  user: string;
  prisma: PrismaClient;
}

@ObjectType()
class UserWithToken {
  @Field()
  token: string;

  @Field()
  user: User;
}
@Resolver()
export class LoginResolver {
  @Query((returns) => UserWithToken)
  async login(
    @Ctx() { prisma }: Context,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<UserWithToken> {
    const result = await prisma.user.findUnique({
      where: { email },
    });
    if (result?.password === password)
      return {
        user: result,
        token: 'token',
      };
    throw new AuthenticationError('No such account or The password error');
  }
}

async function main() {
  const resolversEnhanceMap: ResolversEnhanceMap = {
    Post: {
      _all: [Authorized(['yrobot', 'xt'])],
    },
  };

  applyResolversEnhanceMap(resolversEnhanceMap);

  const schema = await buildSchema({
    resolvers: [LoginResolver, ...resolvers],
    validate: false,
    authChecker: ({ root, args, context, info }, roles) => {
      const user = context.user || '';

      console.log({ roles, user });

      return roles.includes(user); // or false if access is denied
    },
  });

  const prisma = new PrismaClient();
  await prisma.$connect();

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      const user = req.headers.authorization || '';
      return { user, prisma };
    },
  });
  const { port } = await server.listen(4000);
  console.log(`GraphQL is runing on http://localhost:${port}`);
}

main().catch(console.error);
