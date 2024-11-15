const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(users)
}

const getUserById = async (req, res) => {
    try{
        const { userId } = req.params
        const user = await User.findById( userId );
        res.status(200).json(user)
    }
    catch(error){
        res.status(404).json({message: "User not found"})
    }
}

const createUser = async (req, res) => {
    try{
        const newUser = await User.create({ ...req.body });
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({ message: "Unable to create new user"})
    }

}

const updateUser = async (req, res) => {
    try{
        const { userId } = req.params
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { ...req.body },
            { new: true }
        )
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(404).json({ message: "User not found" });
    }
}

const deleteUser = async (req, res) => {
    try{
        const { userId } = req.params
        await User.findOneAndDelete(
            { _id: userId }
        );
        res.status(200).json({message: "User deleted successfully"});
    }
    catch(error){
        res.status(404).json({ message: "User not found"})
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };