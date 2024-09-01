import User from "../models/User.models.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js";
import Task from '../models/Task.models.js';
import Organization from '../models/Organization.models.js';

export const register = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) return next(errorHandler(401, 'Invalid Password!'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT);

        // remove or destructure the password before passing the info to the client, so that the password isn't leaked.
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
}

// Delete user controller
export const deleteUser = async (req, res, next) => {
    try {
      const userId = req.user.id; // Assuming authentication middleware attaches user ID to req.user
  
      // Find the user to check if they exist
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete tasks associated with the user
      await Task.deleteMany({ assignedTo: userId });
  
      // Remove the user from all organizations they are a part of
      await Organization.updateMany(
        { members: userId },
        { $pull: { members: userId } }
      );
  
      // Finally, delete the user
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: 'User account and all related data successfully deleted' });
    } catch (error) {
      next(errorHandler(500, error.message)); // Use your error handler middleware
    }
  };