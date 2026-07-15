const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * {
 * "/api/users/all": {
 * "get": {
 * "summary": "Get all users",
 * "tags": ["Users"],
 * "security": [{ "bearerAuth": [] }],
 * "responses": {
 * "200": { "description": "List of users" }
 * }
 * }
 * }
 * }
 */
router.get('/all', userController.getAll);
module.exports = router;