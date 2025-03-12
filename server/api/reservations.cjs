const express = require("express");
const reservationsRouter = express.Router();
const {
  getAllReservations,
  getReservationById,
  createReservation,
} = require("../db/index.cjs");
require("dotenv").config();

reservationsRouter.get("/", async (req, res, next) => {
  try {
    const animals = await getAllReservations();
    console.log(animals);
    res.send({
      animals,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reservationsRouter.get("/:id", async (req, res, next) => {
  try {
    const reservation = await getReservationById(req.params.id);
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

reservationsRouter.post("/", async (req, res, next) => {
  const { user_id, animal_id, start_date, end_date } = req.body;

  if (!user_id || !animal_id || !start_date || !end_date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (new Date(start_date) >= new Date(end_date)) {
    return res
      .status(400)
      .json({ error: "Start date must be before end date" });
  }
  try {
    const reservation = await createReservation({
      user_id,
      animal_id,
      start_date,
      end_date,
    });

    res.status(201).send({
      message: "Reservation created",
      reservation,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = reservationsRouter;
