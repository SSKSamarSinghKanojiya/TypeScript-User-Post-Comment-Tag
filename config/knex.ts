// Import Knex, the SQL query builder
import knex from "knex";

// Import the Knex configuration from your knexfile (with environment-specific DB config)
import config from "../knexfile";

// Import Objection's Model base class (used for ORM capabilities)
import { Model } from "objection";

// Get the current environment (e.g., development, production); default to "development"
const env: string = process.env.NODE_ENV || "development";

// Get the corresponding Knex config for the current environment
const knexConfig = config[env];

// Initialize a Knex instance with the config
const BaseKnex = knex(knexConfig);

// Bind the initialized Knex instance to Objection's Model class
// This allows all Objection models to use this Knex instance for DB queries
Model.knex(BaseKnex);

// Export the Knex instance so it can be reused throughout the project (e.g., in migrations, models, etc.)
export default BaseKnex;
