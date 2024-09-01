import express from "express";
import { login, logout, register, deleteUser } from "../controllers/auth.controllers.js";
import {verifyToken} from "../utils/verifyUser.js"

const router = express.Router();

// Create a user
router.post('/register', register);

// login
router.post('/login', login);

// logout
router.post('/logout', verifyToken, logout);

// Delete user route
router.delete('/delete', verifyToken, deleteUser);


export default router;