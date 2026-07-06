const todoService = require('../services/todo.service');
const {redis} = require('../DB/redis');
const prisma = require('../DB/prisma');

// دالة مساعدة لمسح الكاش الخاص بالمستخدم والأدمن
const invalidateCache = async (userId) => {
    await redis.del(`todos:user:${userId}`);
    await redis.del('todos:admin');
};

const getTodos = async (req, res) => {
    try {
        const { userId, role } = req.user;
        const cacheKey = role === 'ADMIN' ? 'todos:admin' : `todos:user:${userId}`;
        
        const cachedTodos = await redis.get(cacheKey);
        if (cachedTodos) {
            return res.json({ source: 'cache', data: JSON.parse(cachedTodos) });
        }

        let todos;
        if (role === 'ADMIN') {
            todos = await todoService.findAllAdmin();
        } else {
            todos = await todoService.findAll(req.query, userId);
        }

        await redis.set(cacheKey, JSON.stringify(todos), 'EX', 600);
        res.json({ source: 'database', data: todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const newTodo = await todoService.create(req.body, userId);
        
        // مسح الكاش لأن البيانات تغيرت
        await invalidateCache(userId);
        
        res.status(201).json({ message: "Success", data: newTodo });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};

const deleteTodo = async (req, res) => {
    try {
        await todoService.delete(req.params.id);
        
        // مسح الكاش
        await invalidateCache(req.user.userId);
        
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete todo" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoService.update(req.params.id, req.body);
        
        // مسح الكاش
        await invalidateCache(req.user.userId);
        
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
        
        // مسح الكاش
        await invalidateCache(req.user.userId);
        
        res.json({ message: "Status updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update status" });
    }
};

const getAllTodosForAdmin = async (req, res) => {
    try {
        // لاحظ: بما أننا أضفنا الكاش في getTodos العام، يمكنك توجيه هذا المسار لاستخدام getTodos 
        // أو تطبيق منطق الكاش هنا أيضاً.
        const todos = await todoService.findAllAdmin(); 
        res.json({ data: todos });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch all todos" });
    }
};

module.exports = {getTodos,createTodo,deleteTodo,updateTodo,getTodoById,getAllTodosForAdmin,toggleTodoStatus };