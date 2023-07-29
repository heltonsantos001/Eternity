import { createService, PostFindById, updateService, deleteService, ByUserService } from "../Service/Post.Service.js"

export const create = async (req, res) => {

    try {
        const { fotoPost, title } = req.body

        if (!fotoPost || !title) {
            return res.status(400).send({ message: "foto e titulo necessario" })
        }

        await createService({
            fotoPost,
            title,
            user: req.userId
        })

        res.send({
            message: "postagem criada com sucesso",
        })
    } catch (err) { res.status(500).send(err) }

}

export const updatePost = async (req, res) => {
    try {
        const { title } = req.body
        const id = req.userID
        const userId = req.userId

        if (!title) {
            return res.status(400).send({ message: "é necessario adicionar o titulo" })
        } 

        const post = await PostFindById(id)

        if (!post) {
            return res.status(400).send({ message: "postagem nao encontrada" })
        }

        if (post.user.id != userId) {
            return res.status(400).send({ message: "voce nao é o criador do post" })
        }

        await updateService(id, title)

        res.send("post atualizado")

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const PostId = async (req, res) => {
    try {
        const { id } = req.params

        const post = await PostFindById(id)

        if (!post) {
            return res.status(400).send({ message: "postagem nao encontrada" })
        }

        res.send({
            id: post.id,
            foto: post.profilePicture,
            title: post.title,
            likes: post.likes,
            comments: post.comments,
            data: post.createdAt,
            idUser: post.user.id,
            name: post.user.name,
            fotoUser: post.user.profilePicture,
        })

    } catch (err) {
        res.status(500).send(err)
    }

}

export const deletePost = async (req, res) => {
    try {
        const id = req.userID
        const userId = req.userId

        const post = await PostFindById(id)

        if (!post) {
            return res.status(400).send({ message: "postagem nao encontrada" })
        }

        if (post.user.id != userId) {
            return res.status(400).send({ message: "voce nao é o criador da postagem" })
        }

        await deleteService(id)

        res.send({ message: "post deletado" })

    } catch (err) {
        res.status(500).send(err)
    }
}

export const ByUser = async (req, res) => {
    try {
        const id = req.userId

        const post = await ByUserService(id)

        res.send({
            results: post.map((item) => ({
                id: item._id,
                title: item.title,
                foto: item.fotoPost,
                likes: item.likes,
                comments: item.comments,
                name: item.user ? item.user.name : "Name not available",
                fotoUser: item.user ? item.user.fotoPerfil : "Username not available",
            }))
        })

    }
    catch (err) {
        res.status(500).send(err.message)
    }
}