const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const app = express();

app.use(express.json());


app.use('/api', todoRoutes);
app.use('/user', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});