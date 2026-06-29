const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');
const { validateTodo } = require('../validators/todo.validator');
console.log("Controller Debug:", controller);
// المسارات مع التحقق (Validation)
router.post('/new', validateTodo, controller.createTodo);
router.put('/update/:id', validateTodo, controller.updateTodo);

// المسارات بدون تحقق (لأنها لا تستقبل بيانات من الـ Body)
router.get('/get', controller.getTodos);
router.get('/get/:id', controller.getTodoById);
router.delete('/del/:id', controller.deleteTodo);

// مسار تحديث الحالة (PATCH)
router.patch('/:id/status', controller.toggleTodoStatus);

module.exports = router;