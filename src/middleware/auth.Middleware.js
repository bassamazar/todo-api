const jwt = require('jsonwebtoken');
const prisma = require('../DB/prisma');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        
        req.user = decoded; 
        next();
    });
}


function authorizeAdmin(req, res, next) {
    // req.user يأتي من الميدل وير السابق (authMiddleware)
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admins only" });
    }
}

const checkOwnership = async (req, res, next) => {
    const { id } = req.params;
    const { userId, role } = req.user; // يأتي من authenticateToken

    // إذا كان أدمن، نسمح له بالمرور فوراً (تخطي التحقق)
    if (role === 'ADMIN') return next();

    // التحقق للمستخدم العادي
    const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });

    if (!todo) return res.status(404).json({ error: "Todo not found" });
    if (todo.userId !== userId) return res.status(403).json({ error: "Access denied: Not your todo" });

    next(); 
};


module.exports = { authenticateToken, authorizeAdmin ,checkOwnership};