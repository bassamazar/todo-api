const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../DB/prisma');

// دالة التسجيل
const register = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return newUser;
};

// دالة تسجيل الدخول (يجب إضافتها لأنك استدعيتها في الـ export)
const login = async (email, password) => {
    // 1. البحث عن المستخدم
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    // 2. التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    // 3. إنشاء التوكن
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = { register, login };