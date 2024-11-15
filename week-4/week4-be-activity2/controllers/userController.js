const User = require("../models/userModel");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({}).sort({ createdAt: -1 })
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }

}

const createUser = async (req, res) => {
    try {
        const newUser = await User.create({ ...req.body });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create user" })
    }

}

const getUserById = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const { userId } = req.params
        const user = await User.findById(userId);
        res.status(200).json(user)
    }
    catch (error) {
        res.status(404).json({ message: "User not found" })
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const updatedUser = await User.findOneAndReplace(
            { _id: userId },
            { ...req.body },
            { new: true }
        )
        res.status(200).json(updatedUser);
    }

    catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        await User.findOneAndDelete(
            { _id: userId }
        );
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "User not found" })
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};