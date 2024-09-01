import Task from '../models/Task.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new task
export const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, assignedTo, organization } = req.body;
        const createdBy = req.user.id; // Current logged-in user

        const taskData = {
            title,
            description,
            dueDate,
            assignedTo,
            organization,
            createdBy
        };

        const newTask = new Task(taskData);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Get all tasks for a user
export const getUserTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ assignedTo: userId }).populate('organization').populate('createdBy');
        res.status(200).json(tasks);
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Update a task
export const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!updatedTask) return next(errorHandler(404, 'Task not found'));

        res.status(200).json(updatedTask);
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) return next(errorHandler(404, 'Task not found'));

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};
