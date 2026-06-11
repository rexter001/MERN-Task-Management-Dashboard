// routes/taskRoutes.js - Task CRUD endpoints
// All routes protected by the `protect` middleware — must be logged in

const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Apply auth middleware to ALL task routes
router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);
router.patch('/:id/status', updateTaskStatus); // Separate route for quick status toggle

module.exports = router;
