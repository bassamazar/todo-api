// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json({ message: "User registered successfully", userId: user.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. الحصول على بيانات المستخدم من الخدمة
        const user = await authService.login(email, password); 
        
        // 2. إنشاء التوكين مع تضمين الـ role (وهذا هو التغيير الجوهري)
        const token = jwt.sign(
            { 
                userId: user.id, 
                role: user.role // نضمن إضافة الدور هنا
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login }; 