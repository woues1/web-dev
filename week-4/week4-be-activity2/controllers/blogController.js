const Blog = require("../models/BlogModel");
const mongoose = require("mongoose");

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({message: "Failed to retrieve blogs"})
    }

};


const createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create({ ...req.body });
        res.status(200).json(newBlog)
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create blog" })
    }

};


const getBlogById = async (req, res) => {
    const { blogId } = req.params

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const blog = await Blog.findById(blogId);

        res.status(200).json(blog);
    }
    catch (error) {
        res.status(404).json({ message: "blog not found" });
    }
}

const updateBlog = async (req, res) => {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const updateBlog = await Blog.findOneAndReplace(
            { _id: blogId },
            { ...req.body },
            { new: true }
        );
        res.status(200).json(updateBlog);
    }
    catch (error) {
        res.status(404).json({ message: "Blog not found" });
    }
}

const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const deletedBlog = await Blog.findOneAndDelete(
            { _id: blogId }
        );
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "Blog not found" });
    }

}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};