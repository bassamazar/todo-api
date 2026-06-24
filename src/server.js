require('dotenv').config();
const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const myGuard = require('./middleware/auth.Middleware');
const app = express();

app.use(express.json());


app.use('/api', todoRoutes);
app.use('/api/users', myGuard , userRoutes);
app.use('/api/auth',authRoutes)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

