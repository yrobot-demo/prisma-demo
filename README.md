# prisma-demo

This repo is the demo of guide [《使用 Prisma 搭建 graphql 服务的最佳实践》](https://blog.yrobot.top/blog/Server/使用Prisma搭建graphql服务的最佳实践)

please read [my blog](https://blog.yrobot.top/blog/Server/使用Prisma搭建graphql服务的最佳实践) first.

if you like this guide, start this repo, thanks.

## test prisma in graphql server using apollo studio

1. `yarn` (install npm packages)
2. `yarn migrate` (create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client))
3. `yarn server` (start server)
4. `yarn studio` (optional, open GUI to edit DB)

the server will run at http://localhost:4000

> you can use [apollo studio](https://studio.apollographql.com/sandbox) to test the graphql server

## test guide

1. add some users data in DB by prisma studio, the role can be USER, ADMIN, etc
2. try login API in apollo studio
3. put the login response daya token in Headers with key `Authorization`(the Tab besides Bariables)
4. then test other graphql APIs
