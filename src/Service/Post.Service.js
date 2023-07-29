import Post from "../Model/Post.js";

export const createService = (body) => Post.create(body)

export const PostFindById = (id) => Post.findById({ _id: id }).populate("user")

export const updateService = (id, title) => Post.findOneAndUpdate({ _id: id }, { title }, { rawResult: true })

export const deleteService = (id) => Post.findByIdAndDelete(id)

export const ByUserService = (id) => Post.find({ user: id }).sort({ _id: -1 }).populate("user")
