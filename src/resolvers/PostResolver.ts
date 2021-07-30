import {
  Resolver,
  Ctx,
  Arg,
  Field,
  InputType,
  Authorized,
  Info,
  Mutation,
} from 'type-graphql'

import { Length } from 'class-validator'

import { Post } from '@/generated/type-graphql/models/Post'

import { CreatePostResolver } from '@/generated/type-graphql/resolvers/crud/Post/CreatePostResolver'

@InputType()
class PostInput {
  @Field()
  @Length(4, 50)
  title: string
  @Field({ defaultValue: false })
  published: boolean
}

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
  @Authorized()
  async createPost(
    @Ctx() ctx,
    @Info() Info,
    @Arg('input') postInput: PostInput,
  ): Promise<Post> {
    const { prisma, currentUser } = ctx
    return await new CreatePostResolver().createPost(ctx, Info, {
      data: {
        ...postInput,
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })
  }
}
