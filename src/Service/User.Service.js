import { User } from '../Model/User.js'

export const createService = (body) => User.create(body)

export const searchService = (name) => User.find({
    name: {
        $regex: `${name || ""}`,
        $options: "i"
    }
})

export const findById = (id) => User.findById({_id:id})

export const updateService = (id, name, fotoPerfil) => User.findOneAndUpdate({ _id: id }, { name, fotoPerfil })

