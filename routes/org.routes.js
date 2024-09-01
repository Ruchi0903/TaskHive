import express from 'express';
import {
    createOrganization,
    addMember,
    getUserOrganizations,
    removeMember,
    deleteOrganization
} from '../controllers/org.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Routes for organization management
router.post('/create-org', verifyToken, createOrganization); // Create a new organization
router.put('/:orgId/member/:userId', verifyToken, addMember); // Add a member to an organization
router.get('/get-org', verifyToken, getUserOrganizations); // Get all organizations for the logged-in user
router.delete('/:orgId/member/:userId', verifyToken, removeMember); // Remove a member from an organization
router.delete('/:orgId', verifyToken, deleteOrganization); // Delete an organization

export default router;
