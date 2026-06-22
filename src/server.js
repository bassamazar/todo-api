const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();

app.use(express.json());

// ربط المسارات
app.use('/api', todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});