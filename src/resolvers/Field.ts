import { getMetadataStorage } from 'type-graphql/dist/metadata/getMetadataStorage'
import {
  ReturnTypeFunc,
  AdvancedOptions,
  MethodAndPropDecorator,
} from 'type-graphql/dist/decorators/types'
import { findType } from 'type-graphql/dist/helpers/findType'
import { getTypeDecoratorParams } from 'type-graphql/dist/helpers/decorators'
import { SymbolKeysNotSupportedError } from 'type-graphql/dist/errors'

export type FieldOptions = AdvancedOptions & {
  /** Set to `true` to disable auth and all middlewares stack for this field resolver */
  simple?: boolean
}

export function Field(): MethodAndPropDecorator
export function Field(options: FieldOptions): MethodAndPropDecorator
export function Field(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FieldOptions,
): MethodAndPropDecorator
export function Field(
  returnTypeFuncOrOptions?: ReturnTypeFunc | FieldOptions,
  maybeOptions?: FieldOptions,
): MethodDecorator | PropertyDecorator {
  return (prototype, propertyKey, descriptor) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError()
    }

    const { options, returnTypeFunc } = getTypeDecoratorParams(
      returnTypeFuncOrOptions,
      maybeOptions,
    )
    const isResolver = Boolean(descriptor)
    const isResolverMethod = Boolean(descriptor && descriptor.value)

    const { getType, typeOptions } = findType({
      metadataKey: isResolverMethod ? 'design:returntype' : 'design:type',
      prototype,
      propertyKey,
      returnTypeFunc,
      typeOptions: options,
    })

    // console.log({
    //   name: propertyKey,
    //   schemaName: options.name || propertyKey,
    //   getType,
    //   typeOptions,
    //   complexity: options.complexity,
    //   target: prototype.constructor,
    //   description: options.description,
    //   deprecationReason: options.deprecationReason,
    //   simple: options.simple,
    // })

    getMetadataStorage().collectClassFieldMetadata({
      name: propertyKey,
      schemaName: options.name || propertyKey,
      getType,
      typeOptions,
      complexity: options.complexity,
      target: prototype.constructor,
      description: options.description,
      deprecationReason: options.deprecationReason,
      simple: options.simple,
    })

    if (isResolver) {
      getMetadataStorage().collectFieldResolverMetadata({
        kind: 'internal',
        methodName: propertyKey,
        schemaName: options.name || propertyKey,
        target: prototype.constructor,
        complexity: options.complexity,
      })
    }
  }
}
