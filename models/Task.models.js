import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, // Reference to the user the task is assigned to
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }, // Reference to the organization
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } // Reference to the user who created the task
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
