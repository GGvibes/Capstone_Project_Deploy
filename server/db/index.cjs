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

async function createUser({ firstName, lastName, email, password, location }) {
  const hashedPassword = await bcrypt.hash(password, 5);
  const { rows: [user] } = await client.query(`
    INSERT INTO users(firstName, lastName, email, password, location) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
  `, [firstName, lastName, email, hashedPassword, location]);

  if (!user) {
    throw new Error('Email already exists. Please choose another.');
  }

  return user;
}

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT id, email, firstName, lastName, location, active 
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
        message: "A user with that email does not exist"
      }
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, email, firstName, lastName, location, active
      FROM users
      WHERE id=${ userId }
    `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }

    // user.posts = await getPostsByUser(userId);

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {  
  client,
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById
};
