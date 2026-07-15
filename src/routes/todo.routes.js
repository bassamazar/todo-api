const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');
const { validateTodo } = require('../validators/todo.validator');
// استيراد الميدل ويرز المركزية
const { authenticateToken, authorizeAdmin, checkOwnership } = require('../middleware/auth.Middleware');


/**
 * @swagger
 * {
 * "/api/todos/new": {
 * "post": { "summary": "Create new todo", "tags": ["Todos"], "security": [{"bearerAuth": []}], "responses": { "201": { "description": "Created" } } }
 * },
 * "/api/todos/get": {
 * "get": { "summary": "Get all todos", "tags": ["Todos"], "security": [{"bearerAuth": []}], "responses": { "200": { "description": "Success" } } }
 * },
 * "/api/todos/get/{id}": {
 * "get": { "summary": "Get todo by ID", "tags": ["Todos"], "security": [{"bearerAuth": []}], "parameters": [{"in": "path", "name": "id", "required": true, "schema": {"type": "string"}}], "responses": { "200": { "description": "Success" } } }
 * },
 * "/api/todos/update/{id}": {
 * "put": { "summary": "Update todo", "tags": ["Todos"], "security": [{"bearerAuth": []}], "parameters": [{"in": "path", "name": "id", "required": true, "schema": {"type": "string"}}], "responses": { "200": { "description": "Updated" } } }
 * },
 * "/api/todos/{id}/status": {
 * "patch": { "summary": "Toggle status", "tags": ["Todos"], "security": [{"bearerAuth": []}], "parameters": [{"in": "path", "name": "id", "required": true, "schema": {"type": "string"}}], "responses": { "200": { "description": "Changed" } } }
 * },
 * "/api/todos/del/{id}": {
 * "delete": { "summary": "Delete todo", "tags": ["Todos"], "security": [{"bearerAuth": []}], "parameters": [{"in": "path", "name": "id", "required": true, "schema": {"type": "string"}}], "responses": { "200": { "description": "Deleted" } } }
 * }
 * }
 */
router.post('/new', authenticateToken, validateTodo, controller.createTodo);


router.get('/get', authenticateToken, controller.getTodos);

router.get('/get/:id', authenticateToken, checkOwnership, controller.getTodoById);

router.put('/update/:id', authenticateToken, checkOwnership, validateTodo, controller.updateTodo);


router.patch('/:id/status', authenticateToken, checkOwnership, controller.toggleTodoStatus);

router.delete('/del/:id', authenticateToken, checkOwnership, controller.deleteTodo);


module.exports = router;