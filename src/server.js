require('dotenv').config();
const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const { authenticateToken, authorizeAdmin } = require('./middleware/auth.Middleware');
const swaggerUi = require('swagger-ui-express');
const { specs } = require('./swager'); // المسار الذي وضعت فيه ملف الـ swagger.js


const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/todos', todoRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

