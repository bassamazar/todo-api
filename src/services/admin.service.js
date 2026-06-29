const prisma = require('../DB/prisma');

const getAllData = async () => {
    // جلب كل المهام مع بيانات المستخدمين
    return await prisma.todo.findMany({
        include: { user: true }
    });
};

const deleteUserAccount = async (userId) => {
    // حذف المستخدم (سيقوم Prisma بحذف المهام المرتبطة به تلقائياً إذا كنت مفعل خاصية onDelete: Cascade)
    return await prisma.user.delete({
        where: { id: parseInt(userId) }
    });
};

module.exports = { getAllData, deleteUserAccount };