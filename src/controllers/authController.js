// src/controllers/authController.js
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
        // هنا نستخدم الخدمة التي كتبناها سابقاً للحصول على التوكن
        const token = await authService.login(email, password);
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login }; // أضفنا login هنا