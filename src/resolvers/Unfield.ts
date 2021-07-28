import { getMetadataStorage } from 'type-graphql/dist/metadata/getMetadataStorage'
import { MethodAndPropDecorator } from 'type-graphql/dist/decorators/types'
import { SymbolKeysNotSupportedError } from 'type-graphql/dist/errors'

export function UnField(): MethodAndPropDecorator
export function UnField(): MethodDecorator | PropertyDecorator {
  return (prototype, propertyKey, descriptor) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError()
    }

    const target = prototype.constructor

    // const type = wrapWithTypeOptions(
    //   field.target,
    //   field.name,
    //   convertTypeIfScalar(field.getType()),
    //   field.typeOptions,
    //   false,
    // )

    getMetadataStorage().fields = getMetadataStorage().fields.filter(
      (field) => !(propertyKey === field.name && field.target === target),
    )
  }
}
