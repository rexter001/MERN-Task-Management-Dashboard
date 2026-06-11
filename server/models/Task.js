// models/Task.js - Mongoose schema for user tasks
// Each task is tied to a specific user via userId (ObjectId ref)

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Completed'],
        message: 'Status must be Pending or Completed',
      },
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',              // Reference to the User model
      required: true,           // Every task must belong to a user
      index: true,              // Index for faster queries by user
    },
  },
  {
    timestamps: true, // createdAt and updatedAt added automatically
  }
);

module.exports = mongoose.model('Task', taskSchema);
