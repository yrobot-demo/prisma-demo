import { buildSchema, Authorized } from 'type-graphql';
import { IsEmail, ValidateNested } from 'class-validator';

import {
  resolvers,
  applyResolversEnhanceMap,
  applyRelationResolversEnhanceMap,
  applyModelsEnhanceMap,
  applyOutputTypesEnhanceMap,
  applyInputTypesEnhanceMap,
  applyArgsTypesEnhanceMap,
} from '@generated/type-graphql';
import { authChecker } from '../auth';

import AuthResolver from './AuthResolver';

const getSchema = async () => {
  applyResolversEnhanceMap({
    User: {
      createUser: [Authorized(['ADMIN'])],
    },
  });

  applyRelationResolversEnhanceMap({});

  applyModelsEnhanceMap({});

  applyOutputTypesEnhanceMap({});

  applyArgsTypesEnhanceMap({
    CreateUserArgs: {
      fields: {
        data: [ValidateNested()],
      },
    },
  });

  applyInputTypesEnhanceMap({
    UserCreateInput: {
      fields: {
        email: [IsEmail()],
      },
    },
  });

  return await buildSchema({
    resolvers: [AuthResolver, ...resolvers],
    authChecker: authChecker,
  });
};

export default getSchema;
