import { Router } from "express";
import { createPost, deletePost, getPostById, postList, updatePost } from "../components/postController";
import verifyJWT from "../middleware/authMiddleware";


const router = Router()

// 📌 Public Routes
router.get("/posts", postList);          // GET all posts
router.get("/posts/:id", getPostById);   // GET single post by ID

// 🔒 Protected Routes
router.post("/posts", verifyJWT, createPost);        // POST create post
router.put("/posts/:id", verifyJWT, updatePost);     // PUT update post
router.delete("/posts/:id", verifyJWT, deletePost);  // DELETE post


export default router;