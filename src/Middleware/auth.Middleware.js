import jwt from "jsonwebtoken"
import { findById } from "../Service/User.Service.js"

export const AuthMiddleware = (req, res, next) => {

    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.send(401)
        }

        const parts = authorization.split(" ")

        const [schema, token] = parts

        if (parts.length !== 2) {
            return res.send(401)
        }

        if (schema !== "Bearer") {
            return res.send(401)
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        
            if (error) {
                return res.status(401).send({ message: "token invalid" })
            }

            const user = await findById(decoded.id)


            if (!user || !user.id) {
                return res.status(401).send({ message: "invalid token" })
            }

            req.userId = user.id

            return next()
        
        })


    } catch (err) {
        res.status(500).send(err, "errei fui muleke")
    }
}
