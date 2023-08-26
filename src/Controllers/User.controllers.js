import { createService, searchService, findById, updateService, findByAllUser, updateService2  } from "../Service/User.Service.js"
import { Buffer } from 'buffer'

export const registerUser = async (req, res) => {

    try {

        const {name, email, password} = req.body

        const users = await findByAllUser()

        const founder = users.length <= 1 ? "true" : "false"
        const verified = users.length <= 25 ?"true":"false"
    
       if (!name || !email || !password) {

            return res.status(400).send({ message: "nome email e password necessario" })
        }

        const fotoPerfil = "https://png.pngtree.com/template/20190214/ourlarge/pngtree-purple-infinity-symbol-icons-vector-illustration--unlimitedlim-image_55278.jpg"; 

        const User = await createService(name, email, password, fotoPerfil, verified, founder)

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
    const { name } = req.body;

    if (!name && req.file) {

        try {
            const firebaseUrl = req.file.firebaseUrl;

            const fotoPerfil = firebaseUrl
            const user = await findById(req.userId);

            if (!user) {
                return res.status(400).send({ message: "User not found" });
            }

            await updateService2(req.userId, fotoPerfil);

            return res.send({
                message: "User updated successfully",
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    } 
    

    if (!req.file) {
        if (!name) {
            return res.status(422).send({ error: 'Name is required' });
        }

        try {
            const user = await findById(req.userId);

            if (!user) {
                return res.status(400).send({ message: "User not found" });
            }

            await updateService(req.userId, name);

            return res.send({
                message: "User updated successfully",
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    } 

        

    try {

        const firebaseUrl = req.file.firebaseUrl;

        const fotoPerfil = firebaseUrl
        const user = await findById(req.userId);

            if (!user) {
                return res.status(400).send({ message: "User not found" });
            }

        await updateService(req.userId, name, fotoPerfil);

            return res.send({
                message: "User updated successfully",
                user: { ...user._doc, name, fotoPerfil: firebaseUrl },
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
};

