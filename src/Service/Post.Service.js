import Post from "../Model/Post.js";


export const createService = (body) => Post.create(body)

export const PostFindById = (id) => Post.findById({ _id: id }).populate("user").populate({
    path: 'comments.user.user'
});


export const updateService = (id, title) => Post.findOneAndUpdate({ _id: id }, { title }, { rawResult: true })

export const deleteService = (id) => Post.findByIdAndDelete(id)

export const ByUserService = (id) => Post.find({ user: id }).sort({ _id: -1 }).populate("user")

export const toggleLikeService = async (post, user) => {

    const userLikedPost = post.likes.find((like) => like.user.toString() === user.toString());

    if (userLikedPost) {
        post.likes = post.likes.filter((like) => like.user.toString() !== user.toString());
        await post.save();
        return false;
    } else {
        post.likes.push({ user, created: new Date() });
        await post.save();
        return true;
    }
};

export const commentService = async (id, user, comment) => {
    try {
        const post = await Post.findById(id);

        if (!post) {
            return { message: "postagem não encontrada" };
        }

        const idComment = Math.floor(Date.now() * Math.random()).toString(36)

        post.comments.push({
            user,
            idComment,
            comment,
            created: new Date(),
        })

        await post.save();

        return "comentário criado com sucesso";
    } catch (err) {
        throw new Error(err.message);
    }
};

export const deleteCommentsService =(id,idComment,user)=>Post.findOneAndUpdate({_id:id},{$pull:{comments:{idComment, user}}})


export const findAllService = (offset, limit) => Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

export const countPost= () => Post.countDocuments()