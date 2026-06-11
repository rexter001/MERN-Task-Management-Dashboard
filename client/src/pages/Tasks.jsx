// src/pages/Tasks.jsx - Full task management page with search, filter, and CRUD
import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Toast from '../components/Toast';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);

  // Debounce search so we don't fire an API call on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const { data } = await getTasks(params);
      setTasks(data);
    } catch {
      showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleSave = async (formData) => {
    if (editingTask) {
      const { data } = await updateTask(editingTask._id, formData);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      showToast('Task updated');
    } else {
      const { data } = await createTask(formData);
      setTasks((prev) => [data, ...prev]);
      showToast('Task created!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast('Task deleted');
    } catch {
      showToast('Failed to delete task', 'error');
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const { data } = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
      showToast(status === 'Completed' ? 'Task complete!' : 'Marked as pending');
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
  };

  const hasActiveFilters = search || statusFilter || priorityFilter;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Tasks</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {loading ? '…' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}
            {hasActiveFilters && ' · filtered'}
          </p>
        </div>
        <button
          onClick={() => { setEditingTask(null); setShowModal(true); }}
          className="btn-primary"
        >
          + New task
        </button>
      </div>

      {/* Search and filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks…"
              className="input-field pl-9"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field sm:w-36"
          >
            <option value="">All status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="input-field sm:w-36"
          >
            <option value="">All priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-secondary whitespace-nowrap text-sm">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Task list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {hasActiveFilters ? (
            <>
              <p className="text-slate-600 font-medium">No tasks match your filters</p>
              <button onClick={clearFilters} className="btn-secondary mt-3 text-sm">
                Clear filters
              </button>
            </>
          ) : (
            <>
              <p className="text-slate-600 font-medium">No tasks yet</p>
              <p className="text-slate-400 text-sm mt-1">Create your first task to get started</p>
              <button
                onClick={() => { setEditingTask(null); setShowModal(true); }}
                className="btn-primary mt-4 text-sm"
              >
                Create task
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(t) => { setEditingTask(t); setShowModal(true); }}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
          onSave={handleSave}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
