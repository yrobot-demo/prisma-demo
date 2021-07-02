const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser());
const port = 3000;

app.get('/users', async function (req, res) {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get('/user/:id', async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
});

app.post('/user/create', async function (req, res) {
  const { user } = req.body;
  const result = await prisma.user.create({
    data: user,
  });
  res.send(result);
});

app.post('/user/update', async function (req, res) {
  const { user, id } = req.body;
  const result = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: user,
  });
  res.send(result);
});

app.delete('/user/delete', async function (req, res) {
  const { id } = req.body;
  const result = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
