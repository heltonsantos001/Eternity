import { createService, PostFindById, updateService, deleteService, ByUserService, toggleLikeService, commentService, deleteCommentsService, findAllService, countPost } from "../Service/Post.Service.js"


export const create = async (req, res) => {

    try {
        const { title } = req.body

        const { firebaseUrl } = req.file

        const fotoPost = firebaseUrl

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
            foto: post.fotoPost,
            title: post.title,
            likes: post.likes,
            comments: post.comments.map((comment) => ({
                user: comment.user,
                idComment: comment.idComment
                ,
                comment: comment.comment,
                Data: comment.created
            })),
            data: post.createdAt,
            idUser: post.user.id,
            name: post.user.name,
            fotoUser: post.user.fotoPerfil,
        });

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
        const { id } = req.params

        
        if (!id) return res.status(400).send({ message: "id nao encontrado" })
        

        const post = await ByUserService(id)

        if (post.length === 0) return res.send(post)
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

export const likes = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.userId

        const post = await PostFindById(id);

        const liked = await toggleLikeService(post, user);

        if (liked) {
            return res.send({ message: "like" });
        } else {
            return res.send({ message: "deslike" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

export const addcomments = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.userId
        const { comment } = req.body

        if (!comment) return res.status(400).send({ message: "errei, fui mlk" });

        const newComment = await commentService(id, user, comment)

        res.send({ message: newComment })
    } catch (err) { res.status(500).send(ERR) }


}

export const deleteComments = async (req, res) => {
    try {
        const { id } = req.params
        const { idComment } = req.params
        const user = req.userId

        if (!idComment) return res.status(400).send({ message: "nao tem id" })

        const commentDelete = await deleteCommentsService(id, idComment, user)

        const commentFinder = commentDelete.comments.find((comment) => comment.idComment === idComment)

        if (!commentFinder) return res.status(400).send({ message: "comentario nao existe" })

        if (commentFinder.user != user) return res.status(400).send({ message: "voce nao e o criador do comentario" })

        res.send({ message: "comentario excluido" })
    } catch (err) { res.status(500).send(err) }
}

export const findAll = async (req, res) => {

    try {

        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 15
        }
        if (!offset) {
            offset = 0
        }

        const post = await findAllService(offset, limit)

        const total = await countPost();
        const currentUrl = req.baseUrl

        const next = offset + limit
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if (post.length === 0) {
            return res.status(400).send({ mensagem: "Nao existe nenhuma postagem" })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: post.map((post) => ({
                id: post.id,
                foto: post.fotoPost,
                title: post.title,
                likes: post.likes,
                comments: post.comments.map((comment) => ({
                    user: comment.user,
                    idComment: comment.idComment
                    ,
                    comment: comment.comment,
                    Data: comment.created
                })),
                data: post.createdAt,
                idUser: post.user.id,
                name: post.user.name,
                fotoUser: post.user.fotoPerfil,
                founder: post.user.founder,
                verified: post.user.verified
            }))
        })



    }
    catch (err) {
        res.status(500).send(err.message)
    }
}