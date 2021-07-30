import { MiddlewareInterface, NextFn } from 'type-graphql'

export class Log implements MiddlewareInterface {
  constructor(private readonly logger) {
    this.logger = console
  }

  async use(action, next: NextFn) {
    const {
      info,
      variableValues,
      root,
      context: { currentUser },
    } = action
    // const start = Date.now()
    this.logger.log(currentUser)
    this.logger.log(variableValues)
    this.logger.log(`${info.parentType.name}.${info.fieldName}`)
    this.logger.log(root)
    const result = await next()
    console.log({ result })
    return result
  }
}
