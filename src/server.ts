import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { PrismaClient } from '@/generated/prisma-client'

import { decode, TokenUser } from './auth'
import { isProduction, port } from './env'

import getSchema from './resolvers'
import { logPlugin } from './Plugins/logPlugin'

interface Context {
  prisma: PrismaClient
  currentUser?: TokenUser
  token?: string
}

async function main() {
  const prisma = new PrismaClient()
  await prisma.$connect()

  const server = new ApolloServer({
    schema: await getSchema(),
    context: ({ req }): Context => {
      return { prisma, token: req.headers.authorization }
    },
    debug: true,
    plugins: [logPlugin()],
    formatError: (err) => {
      const { extensions, locations, ...error } = err
      return error
    },
  })
  const { url } = await server.listen(port)
  console.log(`GraphQL is runing on ${url}`)
}

main().catch(console.error)
