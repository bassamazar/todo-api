const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');
const { validateTodo } = require('../validators/todo.validator');

// المسارات مع التحقق (Validation)
router.post('/todos', validateTodo, controller.createTodo);
router.put('/todos/:id', validateTodo, controller.updateTodo);

// المسارات بدون تحقق (لأنها لا تستقبل بيانات من الـ Body)
router.get('/todos', controller.getTodos);
router.get('/todos/:id', controller.getTodoById);
router.delete('/todos/:id', controller.deleteTodo);

// مسار تحديث الحالة (PATCH)
router.patch('/todos/:id/status', controller.toggleTodoStatus);

module.exports = router;