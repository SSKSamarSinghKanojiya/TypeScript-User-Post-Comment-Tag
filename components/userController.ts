import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorResponse, successResponse } from "../lib/utils/responseHandler";

// Load environment variables from .env file
dotenv.config();

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.query().findOne({ email });
    if (existingUser) {
      // res.status(400).json({ message: "User already exists" });
      errorResponse(res, "User already exists", 400);
      return;
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user to DB
    const user = await User.query().insert({
      name,
      email,
      password: hashedPassword,
    });

    // Send response without password
    // res.status(201).json({
    //   message: "User registered successfully",
    //   user: {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //   },
    // });

    successResponse(
      res,
      "User registered successfully",
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      201
    );
  } catch (err: any) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

/**
 * Login user and return JWT token
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.query().findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid Email ID. Please check." });
      return;
    }
    if (req.body.password) {
      console.log("Original password:", req.body.password);
      req.body.password = await bcrypt.hash(req.body.password, 10);
      console.log("Hashed password:", req.body.password);
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Create JWT payload
    const payload: any = { id: user.id, email: user.email };
    const secretKey: any = process.env.JWT_SECRET_KEY;
    const expiresIn: any = process.env.JWT_EXPIRES_IN;

    if (!secretKey || !expiresIn) {
      throw new Error("JWT_SECRET_KEY or JWT_EXPIRES_IN not defined in .env");
    }

    // Generate JWT token
    const token: string = jwt.sign(payload, secretKey, { expiresIn });

    res.status(200).json({ message: "Login successful", token });
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

/**
 * Get profile of currently logged-in user (requires JWT middleware)
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    const user = await User.query().findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "User profile fetched successfully",
      user: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Get all users (admin or debugging purpose)
 */
export const getAllUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.query().select("id", "name", "email");

    res.status(200).json({
      message: "All user profiles fetched",
      users,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Get a single user by ID
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.query().findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "User profile fetched successfully",
      user: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Update user details (optional: only allow updating name/email, not password)
 */
// export const updateUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.params.id;

//     if (!userId) {
//       res.status(400).json({ message: "User ID is required" });
//       return;
//     }

//     // Hash password if it is being updated
//     if (req.body.password) {
//       req.body.password = await bcrypt.hash(req.body.password, 10);
//     }

//     const updatedUser = await User.query().patchAndFetchById(userId, req.body);

//     if (!updatedUser) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res.status(200).json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (err: any) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Pick only allowed fields to update
    const allowedFields = ["name", "email", "password"];
    const updates: any = {};

    allowedFields.forEach((field) => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    // Hash password if it exists
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.query().patchAndFetchById(userId, updates);

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.query().findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await User.query().deleteById(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
