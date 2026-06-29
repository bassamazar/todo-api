const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todos = await todoService.findAll(req.query, userId);
        res.json({ data: todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// في src/controllers/todo.controller.js
const createTodo = async (req, res) => {
    try {
        const userId = req.user.userId; // القادم من التوكين
        const newTodo = await todoService.create(req.body, userId); // تمرير userId كمعامل ثاني
        res.status(201).json({ message: "Success", data: newTodo });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        await todoService.deleteTodo(id, userId);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) { 
        res.status(500).json({ error: "Could not delete todo" }); 
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const updatedTodo = await todoService.update(id, req.body, userId);
        res.json({ message: "Todo updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update todo" });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const todo = await todoService.findOne(id, userId);
        
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
        const userId = req.user.userId;
        const { completed } = req.body;
        
        const updatedTodo = await todoService.update(id, { completed }, userId);
        res.json({ message: "Status updated successfully", data: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Could not update status" });
    }
};

module.exports = {getTodos,createTodo,deleteTodo,updateTodo,getTodoById,toggleTodoStatus };