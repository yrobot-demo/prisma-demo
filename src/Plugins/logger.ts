import { ApolloServerPlugin } from 'apollo-server-plugin-base'
// import * as dayjs from 'dayjs'

import { logRequest, logError } from '@/src/utils/logger'

interface RequestLog {
  requestId: Number
  runTime?: Number
  at?: Date
  request: {
    schema: string
    variables: any
    token: string
  }
  response?: {
    data: any
    errors: Array<any>
  }
}

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
        requestContext.request.operationName !== 'IntrospectionQuery' // apollo studio 会轮训获取最新的 graphql schema，这边就加一个对这个轮训不做埋点
      const startAt = Date.now()
      const requestId = startAt
      const requestLogConetext: RequestLog = {
        requestId,
        at: new Date(),
        request: {
          schema: `${requestContext.request.query}`,
          variables: requestContext.request.variables,
          token: requestContext.request.http.headers.get('Authorization') || '',
        },
        response: null,
      }
      requestContext.response.http.headers.set('request-id', requestId + '')
      return {
        // async parsingDidStart(requestContext) {},
        // async validationDidStart(requestContext) {},
        // async didResolveOperation(requestContext) {},
        async willSendResponse(requestContext) {
          if (shouldLog) {
            const { http, extensions, ...response } = requestContext.response
            requestLogConetext.response = JSON.parse(JSON.stringify(response))
            requestLogConetext.runTime = Date.now() - startAt
            logRequest.info('request', {
              context: requestLogConetext,
            })
          }
        },
        async didEncounterErrors(requestContext) {
          logError.error('error', {
            context: {
              requestId,
              at: new Date(),
              errors: requestContext.errors,
            },
          })
        },
      }
    },
  }
}
