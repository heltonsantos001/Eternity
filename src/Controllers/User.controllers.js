import { createService, searchService, findById, updateService  } from "../Service/User.Service.js"
import { Buffer } from 'buffer'

export const registerUser = async (req, res) => {

    try {

        const {name, email, password} = req.body

       if (!name || !email || !password) {

            return res.status(400).send({ message: "nome email e password necessario" })

        }

        const fotoPerfil = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFG1To4TogtlbKeoY9vMnHk-t13uRZ71G0Zg&usqp=CAU"; 


        const User = await createService(name, email, password, fotoPerfil)


        if (!User) {
            return res.status(400).send({ message: "User not found" })
        }

        res.send({
            message: "usuario criado com sucesso"})

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export const searchUsers = async (req, res) => {

    try {
        const { name } = req.query

        if (!name || name.trim() === '') {
            return res.status(400).send({ message: "nome necessario" })
        }

        const users = await searchService(name)

        if (!users) {
            return res.status(404).send({ message: "user not found" })
        }

        res.send(users)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export const getUserById = async (req, res) => {

    try {

        const id = req.userID

        const User = await findById(id)

        if (!User) {
            return res.status(400).send({ message: "User not found" })
        }

        res.send(User)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export const update = async (req, res) => {

    const { name, fotoPerfil} = req.body
    
    if (!name && !fotoPerfil) {
        return res.status(422).send({ error: 'Name is required' })
    }
        
    const user = await findById(req.userId)

    if(!user){
        return res.status(400).send({ message:"usuario nao encontrado"})
    }

    
    await updateService(req.userId, name, fotoPerfil)

    res.send({
        message: "usuario modificado com sucesso",
        user
    })

}