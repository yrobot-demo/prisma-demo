import { buildSchema, Authorized, Field } from 'type-graphql'
import { IsEmail, ValidateNested } from 'class-validator'

import {
  applyResolversEnhanceMap,
  applyRelationResolversEnhanceMap,
  applyModelsEnhanceMap,
  applyOutputTypesEnhanceMap,
  applyInputTypesEnhanceMap,
  applyArgsTypesEnhanceMap,
} from '@/generated/type-graphql'
import { authChecker } from '../auth'

import { resolvers } from './resolvers'

import { UnField } from '@/src/Decorators/Unfield'
import { Log } from '@/src/Middlewares/Log'

const getSchema = async () => {
  applyResolversEnhanceMap({
    User: {
      createUser: [Authorized(['ADMIN'])],
    },
  })

  applyRelationResolversEnhanceMap({})

  applyModelsEnhanceMap({
    User: {
      fields: {
        password: [UnField()],
      },
    },
  })

  applyOutputTypesEnhanceMap({})

  applyArgsTypesEnhanceMap({
    CreateUserArgs: {
      fields: {
        data: [ValidateNested()],
      },
    },
  })

  applyInputTypesEnhanceMap({
    UserCreateInput: {
      fields: {
        email: [IsEmail()],
        posts: [UnField()],
      },
    },
  })

  return await buildSchema({
    resolvers,
    globalMiddlewares: [Log],
    authChecker: authChecker,
  })
}

export default getSchema
