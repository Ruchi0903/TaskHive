import Organization from '../models/Organization.models.js';
import User from '../models/User.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new organization
export const createOrganization = async (req, res, next) => {
    try {
        const { name } = req.body;
        const ownerId = req.user.id;  // Assume `req.user` is set by JWT middleware (by using that middleware in the route)

        const newOrganization = new Organization({
            name,
            owner: ownerId,
            members: [ownerId],  // The owner is the first member by default
        });

        await newOrganization.save();
        res.status(201).json(newOrganization);
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Add a member to an organization
export const addMember = async (req, res, next) => {
    try {
        const { orgId, userId } = req.params;

        const organization = await Organization.findById(orgId);
        if (!organization) return next(errorHandler(404, 'Organization not found'));

        if (organization.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of the organization' });
        }

        organization.members.push(userId);
        await organization.save();
        res.status(200).json(organization);
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Get all organizations for a user
export const getUserOrganizations = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const organizations = await Organization.find({ members: userId });
        res.status(200).json(organizations);
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Remove a member from an organization
export const removeMember = async (req, res, next) => {
    try {
        const { orgId, userId } = req.params;

        const organization = await Organization.findById(orgId);
        if (!organization) return next(errorHandler(404, 'Organization not found'));

        // removes the user from the list of organization members by userId
        organization.members = organization.members.filter(memberId => memberId.toString() !== userId);
        await organization.save();
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};

// Delete an organization
export const deleteOrganization = async (req, res, next) => {
    try {
        const { orgId } = req.params;

        const organization = await Organization.findById(orgId);
        if (!organization) return next(errorHandler(404, 'Organization not found'));

        // Ensure only the owner can delete the organization
        if (organization.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this organization' });
        }

        await Organization.findByIdAndDelete(orgId);
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
        next(errorHandler(501, error.message));
    }
};
