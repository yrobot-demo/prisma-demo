import { MiddlewareInterface, NextFn } from 'type-graphql'

export class Log implements MiddlewareInterface {
  constructor(private readonly logger) {
    this.logger = console
  }

  async use(action, next: NextFn) {
    const {
      info,
      root,
      args,
      context: { currentUser },
    } = action
    // const start = Date.now()
    // this.logger.log(args)
    // this.logger.log(info.variableValues)
    // this.logger.log('--------------')
    return await next()
  }
}
