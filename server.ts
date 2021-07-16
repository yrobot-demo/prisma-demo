import 'reflect-metadata';
import { buildSchema, Authorized, Resolver, Query, Ctx, Arg } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

import { resolvers, ResolversEnhanceMap, applyResolversEnhanceMap, User } from '@generated/type-graphql';

@Resolver()
export class LoginResolver {
  @Query()
  async login(@Ctx() { prisma }, @Arg('name') name, @Arg('password') password) {
    const result = await prisma.user.findUnique({
      where: { name, password },
    });
    if (result) {
      return {
        token: 'token',
      };
    } else {
      return {
        error: 'error',
      };
    }
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
    resolvers: resolvers,
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
    context: ({ req }) => {
      const user = req.headers.authorization || '';
      return { user, prisma, req };
    },
  });
  const { port } = await server.listen(4000);
  console.log(`GraphQL is runing on http://localhost:${port}`);
}

main().catch(console.error);
