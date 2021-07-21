import { buildSchema, Authorized } from 'type-graphql';

import { resolvers, ResolversEnhanceMap, applyResolversEnhanceMap } from '@generated/type-graphql';
import { authChecker } from '../auth';

import AuthResolver from './AuthResolver';

const getSchema = async () => {
  const resolversEnhanceMap: ResolversEnhanceMap = {
    Post: {},
    User: {
      _all: [Authorized(['ADMIN'])],
    },
  };

  applyResolversEnhanceMap(resolversEnhanceMap);

  return await buildSchema({
    resolvers: [AuthResolver, ...resolvers],
    validate: false,
    authChecker: authChecker,
  });
};

export default getSchema;
