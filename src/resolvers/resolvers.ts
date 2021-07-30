import { NonEmptyArray } from 'type-graphql'

import { UserCrudResolver } from '@/generated/type-graphql'

import { AuthResolver } from './AuthResolver'
import { PostResolver } from './PostResolver'

export const resolvers: NonEmptyArray<Function> = [
  AuthResolver,
  UserCrudResolver,
  PostResolver,
]
