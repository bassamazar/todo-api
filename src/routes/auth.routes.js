
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * {
 * "/api/auth/register": {
 * "post": {
 * "summary": "Register a new user",
 * "tags": ["Authentication"],
 * "responses": {
 * "201": { "description": "User registered successfully" }
 * }
 * }
 * }
 * }
 */
router.post('/register', authController.register);

/**
 * @swagger
 * {
 * "/api/auth/login": {
 * "post": {
 * "summary": "User login",
 * "tags": ["Authentication"],
 * "responses": {
 * "200": { "description": "Login successful" }
 * }
 * }
 * }
 * }
 */
router.post('/login', authController.login);

module.exports = router;

