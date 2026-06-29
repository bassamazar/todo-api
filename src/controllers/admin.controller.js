const adminService = require('../services/admin.service');

const getAllTodos = async (req, res) => {
    try {
        const todos = await adminService.getAllData();
        // إرجاع رسالة إذا كانت البيانات فارغة اختيارياً
        res.json({ count: todos.length, data: todos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        // التحقق من أن id ليس undefined
        if (!id) return res.status(400).json({ error: "User ID is required" });

        await adminService.deleteUserAccount(id);
        res.json({ message: `User with ID ${id} and their data deleted successfully` });
    } catch (error) {
        // إذا كان الخطأ متعلقاً بأن المستخدم غير موجود، يمكن تخصيص الرسالة
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllTodos, deleteUser };