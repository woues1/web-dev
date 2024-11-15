const Car = require("../models/carModel");
const mongoose = require("mongoose");

// GET /cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({}).sort({ createdAt: -1 });
    res.status(200).json(cars);
  }
  catch (error) {
    res.status(500).json({ message: "Failed to retrieve cars" });
  }
};

// POST /cars
const createCar = async (req, res) => {
  try {
    const newCar = await Car.create({ ...req.body });
    res.status(201).json(newCar);
  }
  catch (error) {
    res.status(500).json({ message: "Failed to create car" });
  }
};

// GET /cars/:carId
const getCarById = async (req, res) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    const car = await Car.findById(carId);
    res.status(200).json(car);
  }
  catch (error) {
    res.status(404).json({ message: "Car not found" });
  }
};

// PUT /cars/:carId
const updateCar = async (req, res) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    const updatedCar = await Car.findOneAndReplace(
      { _id: carId },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedCar);

  } catch (error) {
    res.status(404).json({ message: "Car not found" });
  }
};

// DELETE /cars/:carId
const deleteCar = async (req, res) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    const deletedCar = await Car.findOneAndDelete({ _id: carId });
    res.status(200).json({ message: "Car deleted successfully" });
  }
  catch (error) {
    res.status(404).json({ message: "Car not found" });
  }

};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
