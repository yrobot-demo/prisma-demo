import { ApolloServerPlugin } from 'apollo-server-plugin-base'
// import * as dayjs from 'dayjs'

import { logRequest } from '@/src/utils/logger'

export const logger = (): ApolloServerPlugin => {
  return {
    async serverWillStart(service) {
      // logRequest.info('server', {
      //   context: {
      //     type: 'start',
      //     time: dayjs().format(),
      //   },
      // })
    },
    async requestDidStart(requestContext) {
      const shouldLog =
        requestContext.request.operationName !== 'IntrospectionQuery'
      const requestId = Date.now()
      const requestLogger = logRequest.child({ requestId })
      if (shouldLog) {
        requestLogger.info('request', {
          context: {
            schema: `${requestContext.request.query}`,
            variables: requestContext.request.variables,
            token:
              requestContext.request.http.headers.get('Authorization') || '',
          },
        })
      }
      requestContext.response.http.headers.set('request-id', requestId + '')
      return {
        // async parsingDidStart(requestContext) {},
        // async validationDidStart(requestContext) {},
        // async didResolveOperation(requestContext) {},
        async willSendResponse(requestContext) {
          if (shouldLog) {
            const { http, extensions, ...response } = requestContext.response
            requestLogger.info('response', {
              context: JSON.parse(JSON.stringify(response)),
            })
          }
        },
        // async didEncounterErrors(requestContext) {},
      }
    },
  }
}
