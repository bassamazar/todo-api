// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// مسار التسجيل - رابط الطلب سيكون POST /api/auth/register
router.post('/register', authController.register);

// مسار تسجيل الدخول - رابط الطلب سيكون POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;