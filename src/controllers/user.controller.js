const userService = require('../services/user.service');

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const user = await userService.createUser(name);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "تعذر إنشاء المستخدم" });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "تعذر جلب المستخدمين" });
    }
};

module.exports = {create, getAll};