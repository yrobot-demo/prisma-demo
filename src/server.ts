import 'reflect-metadata';
import { buildSchema, Authorized } from 'type-graphql';
import { ApolloServer, ForbiddenError } from 'apollo-server';

import { PrismaClient } from '@generated/prisma-client';
import { resolvers, ResolversEnhanceMap, applyResolversEnhanceMap } from '@generated/type-graphql';

import { LoginResolver, decode } from './auth';

async function main() {
  const resolversEnhanceMap: ResolversEnhanceMap = {
    Post: {
      _all: [Authorized(['ADMIN'])],
    },
    User: {
      _all: [Authorized(['ADMIN'])],
    },
  };

  applyResolversEnhanceMap(resolversEnhanceMap);

  const schema = await buildSchema({
    resolvers: [LoginResolver, ...resolvers],
    validate: false,
    authChecker: ({ root, args, context, info }, roles) => {
      const role = context?.user?.role;
      if (roles.length === 0 || roles.includes(role)) {
        return true;
      }
      throw new ForbiddenError('your role is NOT able to call this API');
    },
  });

  const prisma = new PrismaClient();
  await prisma.$connect();

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      let user;
      if (req.headers.authorization) user = decode(req.headers.authorization);
      console.log({ user });

      return { user, prisma };
    },
  });
  const { port } = await server.listen(4000);
  console.log(`GraphQL is runing on http://localhost:${port}`);
}

main().catch(console.error);
