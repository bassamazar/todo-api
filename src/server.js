require('dotenv').config();
const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const { authMiddleware, authorizeAdmin } = require('./middleware/auth.Middleware');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(express.json());


app.use('/api/todos', authMiddleware, todoRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

