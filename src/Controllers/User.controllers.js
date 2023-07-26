import { createService } from "../Service/User.Service.js"

export const create = async (req, res) => {
    
    const { name, email, password } = req.body

    if (!name || !email || !password) {

        return res.status(400).send({ message: error })
        
    }

    const User = await createService(req.body)

    if (!User) {
        return res.status(400).send({message: "User not found"})
    }

    res.send({message: "user create"})

}

export const findAll = async (req, res) =>{

    const users = await findAllService()

    console.lo(users)

}