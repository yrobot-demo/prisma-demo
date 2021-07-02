const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create 3 users
  await Promise.all(
    [
      { email: 'user1@mail.com', name: 'user1' },
      { email: 'user2@mail.com', name: 'user2' },
      { email: 'user3@mail.com', name: 'user3' },
    ].map(async (user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  );

  // Read
  console.log(await prisma.user.findMany());

  // Update user2
  await prisma.user.update({
    where: {
      email: 'user2@mail.com',
    },
    data: {
      name: 'yrobot',
    },
  });

  // Delete user3
  await prisma.user.delete({
    where: {
      email: 'user3@mail.com',
    },
  });

  // Read
  console.log(await prisma.user.findMany());
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
