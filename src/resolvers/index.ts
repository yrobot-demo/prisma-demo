import { buildSchema, Authorized } from 'type-graphql';
import { IsEmail, ValidateNested } from 'class-validator';

import {
  resolvers,
  ResolversEnhanceMap,
  applyResolversEnhanceMap,
  applyArgsTypesEnhanceMap,
  applyInputTypesEnhanceMap,
} from '@generated/type-graphql';
import { authChecker } from '../auth';

import AuthResolver from './AuthResolver';

const getSchema = async () => {
  const resolversEnhanceMap: ResolversEnhanceMap = {
    Post: {},
    User: {
      _all: [Authorized(['ADMIN'])],
      createUser: [],
    },
  };

  applyResolversEnhanceMap(resolversEnhanceMap);

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
