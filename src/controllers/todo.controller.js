const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
    try {
        // نمرر req.query مباشرة إلى الخدمة
        const todos = await todoService.findAll(req.query);
        res.json({ data: todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const newTodo = await todoService.create(req.body);
        res.status(201).json({ message: "Success", data: newTodo });
    } catch (err) { res.status(500).json({ error: err.message }); }
};


// ... (الدوال السابقة: getTodos, createTodo)

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await todoService.deleteTodo(id);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) { 
        res.status(500).json({ error: "Could not delete todo" }); 
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await todoService.update(id, req.body);
        res.json({ message: "Todo updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update todo" });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoService.findOne(id);
        
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        
        res.json({ data: todo });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch todo" });
    }
};
const toggleTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body; // نأخذ الحالة الجديدة من الـ Body
        
        const updatedTodo = await todoService.update(id, { completed });
        res.json({ message: "Status updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update status" });
    }
};
module.exports = { getTodos, createTodo, deleteTodo, updateTodo, getTodoById, toggleTodoStatus };