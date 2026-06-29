const express = require('express');
const router = express.Router();

// تأكد أن هذا الاسم يطابق الاسم المستخدم في الدوال أدناه
const adminController = require('../controllers/admin.controller'); 
const { authorizeAdmin } = require('../middleware/auth.Middleware');

router.use(authorizeAdmin); 

// المسارات الخاصة بالمدير
// قمنا بتغيير 'controller' إلى 'adminController'
router.get('/all-todos', adminController.getAllTodos); 
router.delete('/delete-user/:id', adminController.deleteUser); 

module.exports = router;