const prisma = require('../DB/prisma');

const findAll = async (query, userId) => {
    const { page = 1, limit = 10, search, completed, sort = 'createdAt', order = 'desc' } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // بناء الـ where بشكل أوضح
    const whereCondition = {
        userId: parseInt(userId), // هنا نضمن أن القيمة رقمية
    };

    if (search) whereCondition.title = { contains: search, mode: 'insensitive' };
    if (completed !== undefined) whereCondition.completed = completed === 'true';

    return await prisma.todo.findMany({
        where: whereCondition,
        orderBy: { [sort]: order },
        skip: skip,
        take: parseInt(limit)
    });
};

const create = async (data, userId) => {
    return await prisma.todo.create({
        data: {
            title: data.title,
            description: data.description,
            // نستخدم connect للربط مع جدول المستخدمين عبر الـ userId
            user: {
                connect: { id: parseInt(userId) }
            }
        }
    });
};

const deleteTodo = async (id, userId) => {
    return await prisma.todo.deleteMany({
        where: { id: parseInt(id), userId: parseInt(userId) }
    });
};

const update = async (id, data, userId) => {
    return await prisma.todo.updateMany({
        where: { id: parseInt(id), userId: parseInt(userId) },
        data: data
    });
};

const findOne = async (id, userId) => {
    return await prisma.todo.findFirst({
        where: { id: parseInt(id), userId: parseInt(userId) }
    });
};

module.exports = { findAll, create, deleteTodo, update, findOne };