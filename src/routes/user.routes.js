const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.create);
router.get('/all', userController.getAll);     


module.exports = router;