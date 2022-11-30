import Review from "./review.model.js";
import Product from "../product/product.model.js";
import User from "../user/user.model.js";
import { TokenVerify } from "../middleware/autentication.js"

export async function createReview(req) {

    const id_product = req.body.idProduct
    const product = await Product.findById(id_product)
    if (product) {
        const token = req.headers.authorization.split(' ').pop()
        const tokenver = await TokenVerify(token)
        if (tokenver) {
            const user = await User.findById(tokenver._id)
            const review = new Review({
                idUser: user._id,
                user: user.username,
                idProduct: product._id,
                product: product.name,
                description: req.body.description,
                calification: req.body.calification
            })

            const result = await review.save()
            return result
        } else { return { message: "Invalid token" } }
    } else { return { message: "Cannot find Product" } }

}

export async function UserReviews(req) {
    const { username } = req
    const review = await Review.find({ user: username })
    return review
}

export async function ReviewsByProduct(req) {
    if (req.id.length == 24) {
        const product = await Product.findById(req.id)
        if (product) {
            const review = await Review.find({ idProduct: req.id })
            return review
        } else { return { message: "Cannot find Product" } }
    } else { return { message: "invalid Product" } }
}

export async function ReviewsByCalification(req) {
    const review = await Review.find({ calification: req.calification })
    return review
}

export async function DeleteReview(req) {
    if (req.params.id) {
        const id_review = req.params.id
        const review = await Review.findById(id_review)
        console.log(id_review)
        if (review) {
            const token = req.headers.authorization.split(' ').pop()
            const tokenver = await TokenVerify(token)
            if (tokenver) {
                if (tokenver._id == review.idUser) {
                    const rev = await Review.remove({ _id: id_review })
                    return rev
                } else { return { message: "Error" } }

            } else { return { message: "Invalid token" } }
        } else { return { message: "Cannot Find review" } }


    }else { return { message: "invalid Id" } }
}

export async function GetUC(req) {
    const { username, calification } = req.params
    if (username) {
        if(calification){
            const result = await Review.find({ user: username, calification: calification })
            return result
        }else{ return { message: "need calification" } }
    }else { return { message: "need username" } }
}

export async function GetRP(req) {
    const { idp, calification } = req.params
    if (idp) {
        if(calification){
            const result = await Review.find({idProduct:idp, calification:calification})
            return result
        }else{ return { message: "need calification" } }
    }else { return { message: "need product ID" } }
}
