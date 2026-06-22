const prisma = require('../DB/prisma');

const findAll = async (query) => {
    // تحديد القيم الافتراضية إذا لم يرسل المستخدم شيئاً
    const { page = 1, limit = 10, search, sort = 'createdAt', order = 'desc' } = query;
    
    // حساب الـ skip (عدد العناصر التي نتخطاها)
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    return await prisma.todo.findMany({
        where: {
            title: { contains: search, mode: 'insensitive' } // البحث
        },
        orderBy: { [sort]: order }, // الترتيب
        skip: skip,
        take: parseInt(limit) // الترقيم (Pagination)
    });
};

const create = async (data) => await prisma.todo.create({ data });


const deleteTodo = async (id) => {
    return await prisma.todo.delete({
        where: { id: parseInt(id) } // تحويل الـ id إلى رقم
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
        where: { id: parseInt(id) }
    });
};

module.exports = { findAll, create, deleteTodo, update, findOne };