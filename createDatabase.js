// another

const { Client } = require('pg');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// PostgreSQL connection config (connects to default DB)
const baseClient = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres', // <-- update your password here
  port: 5432,
  database: 'postgres'
});

// Function to check if a database exists
async function databaseExists(dbName) {
  const res = await baseClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
  return res.rowCount > 0;
}

// Function to prompt user for input
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Main logic
async function createDatabaseFlow() {
  try {
    await baseClient.connect();
    console.log('✅ Connected to PostgreSQL successfully.');

    let dbName = await ask('Enter the name of the database you want to create: ');

    while (await databaseExists(dbName)) {
      console.log(`⚠️  Database "${dbName}" already exists.`);
      dbName = await ask('Enter a different name: ');
    }

    await baseClient.query(`CREATE DATABASE "${dbName}"`);
    console.log(`✅ Database "${dbName}" created successfully.`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    rl.close();
    await baseClient.end();
  }
}

createDatabaseFlow();



