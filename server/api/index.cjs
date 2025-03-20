// api/index.js
const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/index.cjs");
require("dotenv").config();

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    return next(); 
  }

  if (!auth.startsWith(prefix)) {
    return next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with '${prefix}'`,
    });
  }

  const token = auth.slice(prefix.length);

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
      return next({
        name: "AuthorizationHeaderError",
        message: "Authorization token malformed",
      });
    }

    req.user = await getUserById(id);

    if (!req.user) {
      return next({
        name: "UserNotFoundError",
        message: "User not found. Invalid token?",
      });
    }

    next();
  } catch (error) {
    next({
      name: error.name || "AuthorizationError",
      message: error.message || "Failed to verify token",
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const usersRouter = require("./users.cjs");
apiRouter.use("/users", usersRouter);


apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;