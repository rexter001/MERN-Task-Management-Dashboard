// controllers/taskController.js - All task CRUD operations
// Every query is scoped to req.user._id so users only see their own tasks

const Task = require('../models/Task');

// ─── GET /api/tasks ───────────────────────────────────────────────────────────
// Returns all tasks for the authenticated user
// Supports: ?status=Pending|Completed, ?priority=Low|Medium|High, ?search=keyword
const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    // Build a dynamic filter object — always scoped to the current user
    const filter = { userId: req.user._id };

    if (status && ['Pending', 'Completed'].includes(status)) {
      filter.status = status;
    }
    if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
      filter.priority = priority;
    }
    if (search && search.trim()) {
      // Case-insensitive text search across title and description
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 }); // Newest first
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// ─── GET /api/tasks/:id ───────────────────────────────────────────────────────
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

// ─── POST /api/tasks ──────────────────────────────────────────────────────────
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || 'Medium',
      status: status || 'Pending',
      dueDate: dueDate || null,
      userId: req.user._id,  // Always attach to the requesting user
    });

    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// ─── PUT /api/tasks/:id ───────────────────────────────────────────────────────
const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // findOneAndUpdate with userId check prevents users from editing others' tasks
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, priority, status, dueDate },
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// ─── DELETE /api/tasks/:id ────────────────────────────────────────────────────
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

// ─── PATCH /api/tasks/:id/status ─────────────────────────────────────────────
// Quick toggle — used by the "Mark Complete" button on task cards
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task status' });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus };
