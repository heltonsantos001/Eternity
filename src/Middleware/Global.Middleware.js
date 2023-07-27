import mongoose from "mongoose"

export const validID = async (req, res, next) => {
    
    const id = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).send({ mensagem: "invalid ID" })
    }

    req.userID = id

    next()
}