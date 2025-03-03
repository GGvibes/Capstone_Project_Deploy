const express = require('express');
const usersRouter = express.Router();
// const bcyrpt = require ("bcrypt")

const { 
  createUser,
  getAllUsers
} = require('../db');
require('dotenv').config();
// const jwt = require('jsonwebtoken');


usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
  
    res.send({
      users
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// usersRouter.post('/login', async (req, res, next) => {
//   const { username, password } = req.body;

//   // request must have both
//   if (!username || !password) {
//     next({
//       name: "MissingCredentialsError",
//       message: "Please supply both a username and password"
//     });
//   }

//   try {
//     const user = await getUserByUsername(username);

//     if (user && await bcyrpt.compare(password, user.password)) {
//       const token = jwt.sign({ 
//         id: user.id, 
//         username
//       }, process.env.JWT_SECRET, {
//         expiresIn: '1w'
//       });

//       res.send({ 
//         message: "you're logged in!",
//         token 
//       });
//     } else {
//       next({ 
//         name: 'IncorrectCredentialsError', 
//         message: 'Username or password is incorrect'
//       });
//     }
//   } catch(error) {
//     console.log(error);
//     next(error);
//   }
// });

// usersRouter.post('/register', async (req, res, next) => {
//   const { username, password, name, location } = req.body;

//   try {

//     const user = await createUser({
//       username,
//       password,
//       name,
//       location,
//     });
//     console.log(process.env.JWT_SECRET);
//     const token = await jwt.sign({ 
//       id: user.id, 
//       username
//     }, process.env.JWT_SECRET, {
//       expiresIn: '1w'
//     });

//     res.status(201).send({ 
//       message: "thank you for signing up",
//       token 
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   } 
// });

module.exports = usersRouter;