const prisma = require('../DB/prisma');

const findAll = async (query, userId) => {
    const { 
        page = 1, limit = 10, search, 
        description, startDate, endDate, completed,
        sort = 'createdAt', order = 'desc' 
    } = query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // بناء كائن الـ where الديناميكي
    const where = {
        ...(userId && { userId: parseInt(userId) }),
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
        ...(description && { description: { contains: description, mode: 'insensitive' } }),
        ...(completed !== undefined && { completed: completed === 'true' }),
        ...( (startDate || endDate) && {
            createdAt: {
                ...(startDate && { gte: new Date(startDate) }),
                ...(endDate && { lte: new Date(endDate) })
            }
        })
    };

    return await prisma.todo.findMany({
        where: where,
        orderBy: { [sort]: order },
        skip: skip,
        take: parseInt(limit),
        include: { user: { select: { name: true } } }
    });
};

const create = async (data) => await prisma.todo.create({ data });

const deleteTodo = async (id) => {
    return await prisma.todo.delete({
        where: { id: parseInt(id) }
    });
};

const update = async (id, data) => {
    return await prisma.todo.update({
        where: { id: parseInt(id) },
        data: data,
    });
};

const findOne = async (id) => {
    return await prisma.todo.findUnique({
        where: { id: parseInt(id) },
        // إضافة الـ include هنا أيضاً لجلب اسم المستخدم عند البحث عن مهمة واحدة
        include: {
            user: {
                select: { name: true }
            }
        }
    });
};

module.exports = { findAll, create, deleteTodo, update, findOne };