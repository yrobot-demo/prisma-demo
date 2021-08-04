# prisma-demo

This repo is the demo of guide [《Prisma 的简介和使用》](https://blog.yrobot.top/blog/Server/Prisma的简介和使用)

please read [my blog](https://blog.yrobot.top/blog/Server/Prisma的简介和使用) first.

if you like this guide, start this repo, thanks.

## test prisma in http server?

1. `yarn` (install npm packages)
2. `yarn migrate` (create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client))
3. `yarn server` (start node server)
4. `yarn studio` (optional, open GUI to edit DB)

the server will run at http://localhost:3000

> you can open `./apis.http`, to test APIs with vscode extend called `REST Client`

## test prisma in nodejs

1. `yarn`
2. `yarn migrate`
3. `node ./test.js`
