import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import { PrismaClient } from '@/generated/prisma-client';

import { decode, TokenUser } from './auth';
import { isProduction, port } from './env';

import getSchema from './resolvers';

interface Context {
  prisma: PrismaClient;
  user?: TokenUser;
}

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const server = new ApolloServer({
    schema: await getSchema(),
    context: ({ req }): Context => {
      let user = null;
      if (req.headers.authorization) user = decode(req.headers.authorization);
      return { user, prisma };
    },
    debug: !isProduction,
  });
  const { url } = await server.listen(port);
  console.log(`GraphQL is runing on ${url}`);
}

main().catch(console.error);
