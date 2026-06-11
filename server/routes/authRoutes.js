// routes/authRoutes.js - Authentication endpoints
// Routes are kept thin — all logic lives in the controller

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // Protected — requires valid JWT

module.exports = router;
