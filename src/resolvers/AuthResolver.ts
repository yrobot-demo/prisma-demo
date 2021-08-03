import {
  Resolver,
  Query,
  Ctx,
  Arg,
  ObjectType,
  Field,
  InputType,
} from 'type-graphql'
import { AuthenticationError } from 'apollo-server'

import { Field as MyField } from '@/src/Decorators/Field'
import { encode } from '@/src/auth'

@ObjectType()
class UserInfo {
  @MyField()
  name: string
  @Field()
  email: string
}

@ObjectType()
class Login {
  @MyField()
  token: string
  @Field((type) => UserInfo)
  user: UserInfo
}

@InputType()
class LoginInput {
  @MyField()
  email: string
  @Field()
  password: string
}
@Resolver()
export class AuthResolver {
  @Query(() => Login)
  async login(
    @Ctx() { prisma },
    @Arg('input') loginInput: LoginInput,
  ): Promise<Login> {
    const { email, password } = loginInput
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (user?.password === password)
      return {
        user: user,
        token: encode(user),
      }
    throw new AuthenticationError('用户名不存在 或 密码错误')
  }
}
