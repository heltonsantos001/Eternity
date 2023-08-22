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

export const findByAllUser = () => User.find()


export const countPost = () => Post.countDocuments()

const BUCKET = "eternity-26961.appspot.com"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket()

export const uploadImageUser = async (req, res, next) => {

    if (!req.file) return res.status(400).send("adicione uma imagem")

    const imagem = req.file

    const fileName = Date.now() + "." + imagem.originalname.split(".").pop()

    const file = bucket.file(fileName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype,
        }
    })


    stream.on("error", () => {
        console.error(e)
    })

    stream.on("finish", async () => {

        await file.makePublic()

        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`

        next()
    })

    stream.end(imagem.buffer)
}