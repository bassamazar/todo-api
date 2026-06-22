const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (name) => {
    return await prisma.user.create({ data: { name } });
};

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

module.exports = { createUser, getAllUsers };