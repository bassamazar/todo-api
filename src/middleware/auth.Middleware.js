const jwt = require('jsonwebtoken');

// هذا الميدل وير للتحقق من هوية المستخدم (التوكين)
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        
        req.user = decoded; // يحتوي الآن على userId و role
        next();
    });
}

// هذا الميدل وير الجديد للتحقق من أن المستخدم مدير
function authorizeAdmin(req, res, next) {
    // req.user يأتي من الميدل وير السابق (authMiddleware)
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admins only" });
    }
}

module.exports = { authMiddleware, authorizeAdmin };