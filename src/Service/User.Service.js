import { User } from '../Model/User.js'
import admin from "firebase-admin"
import serviceAccount from "../config/firebase.mjs"

export const createService = (name, email, password, fotoPerfil, verified, founder) => User.create({ name, email, password, fotoPerfil, verified, founder })

export const searchService = (name) => User.find({
    name: {
        $regex: `${name || ""}`,
        $options: "i"
    }
})

export const findById = (id) => User.findById({_id:id})

export const updateService = (id, name, fotoPerfil) => User.findOneAndUpdate({ _id: id }, { name, fotoPerfil })

export const updateService2 = (id, fotoPerfil) => User.findOneAndUpdate({ _id: id }, { fotoPerfil })

export const findByAllUser = () => User.find()


export const countPost = () => Post.countDocuments()
