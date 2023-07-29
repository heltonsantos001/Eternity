import bcrypt from 'bcrypt'
import { GToken, findByEmail } from '../Service/Auth.Service.js'

export const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ message: "digite a senha e email" })
    }

    const user = await findByEmail(email)

    if (!user) {
        return res.status(400).send({ message: "senha ou email invaido" })

    }

    const isPassWordValid = bcrypt.compareSync(password, user.password)

    if (!isPassWordValid) {
        return res.status(400).send({ message: "senha ou email invalido" })
    }

    const token =  GToken(user.id)

    res.send({token:token})
}