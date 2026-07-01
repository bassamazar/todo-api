const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
    try {
        const { userId, role } = req.user;
        let todos;

        if (role === 'ADMIN') {
            // الأدمن يحصل على كل شيء
            todos = await todoService.findAllAdmin();
        } else {
            // المستخدم العادي يحصل على مهامه فقط
            todos = await todoService.findAll(req.query, userId);
        }

        res.json({ data: todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const newTodo = await todoService.create(req.body, userId);
        res.status(201).json({ message: "Success", data: newTodo });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};

// لاحظ البساطة! لا نحتاج للتحقق من الأدمن هنا، الميدل وير قام به.
const deleteTodo = async (req, res) => {
    try {
        await todoService.delete(req.params.id);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete todo" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoService.update(req.params.id, req.body);
        res.json({ message: "Todo updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update todo" });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todo = await todoService.findOne(req.params.id);
        res.json({ data: todo });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch todo" });
    }
};

const toggleTodoStatus = async (req, res) => {
    try {
        const { completed } = req.body;
        const updatedTodo = await todoService.update(req.params.id, { completed });
        res.json({ message: "Status updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update status" });
    }
};
const getAllTodosForAdmin = async (req, res) => {
    try {
        // بما أننا أدمن، نجلب كل شيء من الـ service
        const todos = await todoService.findAllAdmin(); 
        res.json({ data: todos });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch all todos" });
    }
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo, getTodoById,getAllTodosForAdmin, toggleTodoStatus };