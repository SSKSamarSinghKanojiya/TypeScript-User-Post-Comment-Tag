// Import Node.js path module to work with file paths
import path from "path";

// Import dotenv to load environment variables from .env files
import dotenv from "dotenv";

// dotenv.config();
// Load environment variables from file named `.env.{NODE_ENV}` (e.g., .env.development)
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Define the environment: development, staging, or production. Defaults to "development"
// const env = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV || "development";
console.log("Loading Environment : ", env);

// Construct the full file path to the environment-specific .env file (e.g., env.development)
const envFilePath = path.resolve(process.cwd(), `env.${env}`);
console.log("Loading Environment File : ", envFilePath);

// Load the actual environment file from the constructed path
dotenv.config({ path: envFilePath });

// Log out the database connection details to verify they are loaded correctly
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE_NAME);

// Define Knex configuration object for "development" environment
const config: any = {
  development: {
    client: "postgresql", // Specify database client: PostgreSQL
    connection: {
      host: process.env.DB_HOST, // Database host (e.g., localhost or IP)
      user: process.env.DB_USER, // Database user
      password: process.env.DB_PASSWORD, // Database password
      database: process.env.DB_DATABASE_NAME, // Database name
    },
    pool: {
      min: 2, // Minimum number of database connections in pool
      max: 10, // Maximum number of connections
    },
    migrations: {
      directory: "./migrations", // Folder where migration files are stored
      tableName: "knex_migrations", // Table used to track migration history
    },
    seeds: {
      directory: "./seeds", // Folder where seed files are stored
    },
  },
};

// Export the configuration so it can be used by Knex CLI and your app
export default config;

// Usage example (command line):
// Run this command to create a new migration file:
// npm run migrate:make create_notes_table
