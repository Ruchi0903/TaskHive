import express from "express";
import { createTask, getUserTasks, updateTask, deleteTask } from "../controllers/tasks.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";



const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/get-tasks-for-user', verifyToken, getUserTasks);
router.patch('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

export default router;