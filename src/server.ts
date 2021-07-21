import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import { PrismaClient } from '@generated/prisma-client';

import { decode } from './auth';
import { isProduction } from './env';

import getSchema from './resolvers';

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const server = new ApolloServer({
    schema: await getSchema(),
    context: ({ req }) => {
      let user = null;
      if (req.headers.authorization) user = decode(req.headers.authorization);
      return { user, prisma };
    },
    debug: !isProduction,
  });
  const { port } = await server.listen(4000);
  console.log(`GraphQL is runing on http://localhost:${port}`);
}

main().catch(console.error);
