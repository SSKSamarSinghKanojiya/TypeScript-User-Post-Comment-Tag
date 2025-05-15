// Import required modules
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Model } from "objection";
import BaseKnex from "./config/knex"; // Knex instance configured with Objection

// Initialize the Express application
const app = express();

// Import route files
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import tagRoutes from "./routes/tagRoutes";
import postTagRoutes from "./routes/postTagRoutes";
import { errorHandler } from "./middleware/errorHandler";

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse JSON using body-parser (redundant with express.json but often kept for legacy support)
app.use(bodyParser.json());

// Middleware to parse URL-encoded data from HTML forms
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse URL-encoded form data (also redundant, but used in some cases where bodyParser is preferred)
app.use(express.urlencoded({ extended: true }));

// Load environment variables from .env file
dotenv.config();

// Bind the configured Knex instance to Objection.js's base Model
Model.knex(BaseKnex);

// Global error handler
app.use(errorHandler);

// Define API routes
app.use("/api/user", userRoutes);           // Handles user-related endpoints
app.use("/api/post", postRoutes);           // Handles post-related endpoints
app.use("/api/comment", commentRoutes);     // Handles comment-related endpoints
app.use("/api/tag", tagRoutes);             // Handles tag-related endpoints
app.use("/api/postTag", postTagRoutes);     // Handles post-tag relationship endpoints

// Define the port the server will listen on (default to 3001 if not set in .env)
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});


// ------- Knex CLI Reference Commands -------

// Rollback the last migration batch
// Run: 
// npx knex migrate:rollback

/*
Run the following commands to create migration files:

npx knex migrate:make create_users         // Users table
npx knex migrate:make create_posts         // Posts table
npx knex migrate:make create_comments      // Comments table
npx knex migrate:make create_tags          // Tags table
npx knex migrate:make create_posts_tags    // Posts-Tags join table
*/
