const pg = require ("pg");
const bcrypt = require ('bcrypt');
const dotenv = require ('dotenv')
dotenv.config();

const { Client } = pg;

const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:juniper23@localhost:5432/capstone_project';

const client = new Client({
  connectionString: databaseURL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

/**
 * USER Methods
 */

async function createUser({ email, password, name, location }) {
  const hashedPassword = await bcrypt.hash(password, 5);
  const { rows: [user] } = await client.query(`
    INSERT INTO users(email, password, name, location) 
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `, [email, hashedPassword, name, location]);

  if (!user) {
    throw new Error('Email already exists. Please choose another.');
  }

  return user;
}

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT id, email, name, location, active 
    FROM users;
  `);
  return rows;
}


async function getUserByEmail(email) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE email=$1
    `, [ email ]);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that username does not exist"
      }
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


module.exports = {  
  client,
  createUser,
  getAllUsers,
  getUserByEmail
};
