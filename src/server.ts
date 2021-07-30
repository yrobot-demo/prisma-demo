import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { PrismaClient } from '@/generated/prisma-client'

import { decode, TokenUser } from './auth'
import { isProduction, port } from './env'

import getSchema from './resolvers'

interface Context {
  prisma: PrismaClient
  currentUser?: TokenUser
}

async function main() {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const server = new ApolloServer({
    schema: await getSchema(),
    context: ({ req }): Context => {
      let currentUser = null
      if (req.headers.authorization)
        currentUser = decode(req.headers.authorization)
      return { currentUser, prisma }
    },
    debug: !isProduction,
  })
  const { url } = await server.listen(port)
  console.log(`GraphQL is runing on ${url}`)
}

main().catch(console.error)
