import { User } from "../Model/User.js";
import jwt from "jsonwebtoken"


export const findByEmail = (email) => User.findOne({email:email}).select("+password")

export const GToken = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn:84600})