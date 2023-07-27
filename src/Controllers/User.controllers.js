import { createService, searchService, findById } from "../Service/User.Service.js"

export const registerUser = async (req, res) => {

    try {
       
        const { name, email, password } = req.body


        if (!name || !email || !password) {

            return res.status(400).send({ message: error })

        }

        const User = await createService(req.body)

        if (!User) {
            return res.status(400).send({ message: "User not found" })
        }

        res.send(User)

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
