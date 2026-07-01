const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');
const { validateTodo } = require('../validators/todo.validator');
// استيراد الميدل ويرز المركزية
const { authenticateToken, authorizeAdmin, checkOwnership } = require('../middleware/auth.Middleware');

router.post('/new', authenticateToken, validateTodo, controller.createTodo);

router.get('/get', authenticateToken, controller.getTodos);

router.get('/get/:id', authenticateToken, checkOwnership, controller.getTodoById);

router.put('/update/:id', authenticateToken, checkOwnership, validateTodo, controller.updateTodo);

router.patch('/:id/status', authenticateToken, checkOwnership, controller.toggleTodoStatus);

router.delete('/del/:id', authenticateToken, checkOwnership, controller.deleteTodo);



module.exports = router;