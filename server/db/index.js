const { Client } = require('pg') // imports the pg module
const bcrypt = require ('bcrypt');
// const jwt = require('jsonwebtoken')
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:juniper23@localhost:5432/capstone_project',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

/**
 * USER Methods
 */

async function createUser({ 
  username, 
  password,
  name,
  location
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 5)
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password, name, location) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, hashedPassword, name, location]);

    if (!user) {
      throw new Error('Username already exists. Please choose another.');
    }

    return user;
  } catch (error) {
    throw error;
  }
}
async function getAllUsers() {
    try {
      const { rows } = await client.query(`
        SELECT id, username, name, location, active 
        FROM users;
      `);
    
      return rows;
    } catch (error) {
      throw error;
    }
  }

module.exports = {  
  client,
  createUser,
  getAllUsers
  
}