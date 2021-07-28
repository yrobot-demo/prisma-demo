import { buildSchema, Authorized, Field } from 'type-graphql'
import { IsEmail, ValidateNested } from 'class-validator'

import {
  resolvers,
  applyResolversEnhanceMap,
  applyRelationResolversEnhanceMap,
  applyModelsEnhanceMap,
  applyOutputTypesEnhanceMap,
  applyInputTypesEnhanceMap,
  applyArgsTypesEnhanceMap,
} from '@generated/type-graphql'
import { authChecker } from '../auth'

import AuthResolver from './AuthResolver'

import { UnField } from './Unfield'

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
      },
    },
    PostCreateInput: {
      fields: {
        author: [],
      },
    },
  })

  return await buildSchema({
    resolvers: [AuthResolver, ...resolvers],
    authChecker: authChecker,
  })
}

export default getSchema
