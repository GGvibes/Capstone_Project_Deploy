const pg = require("pg");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const { Client } = pg;

const databaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:juniper23@localhost:5432/capstone_project";

const client = new Client({
  connectionString: databaseURL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});


/**
 * USER Methods
 */

async function createUser({ firstName, lastName, email, password, address }) {
  const hashedPassword = await bcrypt.hash(password, 5);
  const {
    rows: [user],
  } = await client.query(
    `
    INSERT INTO users(firstName, lastName, email, password, address) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
  `,
    [firstName, lastName, email, hashedPassword, address]
  );

  if (!user) {
    throw new Error("Email already exists. Please choose another.");
  }

  return user;
}

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT id, email, firstName, lastName, address
    FROM users;
  `);
  return rows;
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
    `,
      [email]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that email does not exist",
      };
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, email, firstName, lastName, address
      FROM users
      WHERE id=$1
    `,
      [userId]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist",
      };
    }

    // user.posts = await getPostsByUser(userId);

    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * ANIMAL Methods
 */

async function createAnimals({ type, num_animals, breed }) {
  const {
    rows: [animal],
  } = await client.query(
    `
    INSERT INTO animals(type, num_animals, breed) 
    VALUES($1, $2, $3)
    RETURNING *;
  `,
    [type, num_animals, breed]
  );

  return animal;
}

async function getAllAnimals() {
  const { rows } = await client.query(`
    SELECT id, type, num_animals, breed
    FROM animals;
  `);
  return rows;
}


async function getAnimalById(animal_id) {
  try {
    const {
      rows: [animal],
    } = await client.query(
      `
      SELECT id, type, num_animals, breed
      FROM animals
      WHERE id=$1
    `,
      [animal_id]
    );

    if (!animal) {
      throw {
        name: "AnimalNotFoundError",
        message: "An animal with that id does not exist",
      };
    }

    return animal;
  } catch (error) {
    throw error;
  }
}
/**
 * RSERVATION Methods
 */

// async function createReservation({ user_id, animal_id, start_date, end_date }) {
//   try {
//     console.log("Creating reservation for user:", user_id, "animal:", animal_id);  //Debugging
//     const {
//       rows: [reservation],
//     } = await client.query(
//       `
//     INSERT INTO reservations(user_id, animal_id, start_date, end_date) 
//     VALUES($1, $2, $3, $4)
//     RETURNING *;
//   `,
//       [user_id, animal_id, start_date, end_date]
//     );
//     console.log("Successfully created reservation:", reservation); //Debugging
//     return reservation;
//   } catch (error) {
//     console.error("Error creating reservation:", error.message);
//     throw error;
//   }
// }

const createReservation = async ({ user_id, animal_id, start_date, end_date }) => {
  try {
    await client.query('BEGIN'); // Start transaction

    const {
      rows: [reservation],
    } = await client.query(
      `
      INSERT INTO reservations(user_id, animal_id, start_date, end_date) 
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [user_id, animal_id, start_date, end_date]
    );

    await client.query('COMMIT'); // Commit transaction
    return reservation;
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error("Error creating reservation:", error.message);
    throw error;
  }
};

async function getAllReservations() {
  const { rows } = await client.query(`
    SELECT id, user_id, animal_id, start_date, end_date 
    FROM reservations;
  `);
  return rows;
}

module.exports = {
  client,
  createUser,
  createAnimals,
  createReservation,
  getAllUsers,
  getAllAnimals,
  getAnimalById,
  getAllReservations,
  getUserByEmail,
  getUserById,
};
