import Category from "./category.model.js";
import User from "../user/user.model.js";
import { TokenVerify } from "../middleware/autentication.js"


export async function createCategory(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })
    if (userExist) {
        const admin = await User.findOne({ username: "admin" })
        if (tokenver) {
            if (tokenver._id == admin._id) {
                const category = new Category({
                    name: req.body.name.toLowerCase(),
                    products: []
                })
                const result = await category.save()
                return result
            } return { message: "operation only for admin" }
        } return { message: "invalid token" }

    } return { message: "invalid token" }

}

export async function getCategories() {
    const categories = await Category.find()
    return categories
}

export async function getOneCategory(req) {
    const cat = await Category.findOne({ name: req.name.toLowerCase() })
    if (cat) {
        return cat
    }
    return { message: "Cannot Find" }
}

export async function updateCategory(req) {

    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })

    if (userExist) {
        const admin = await User.findOne({ username: "admin" })
        if (tokenver) {
            if (tokenver._id == admin._id) {
                const cat = await Category.updateOne({ name: req.body.name }, { name: req.body.new_name })
                if (cat) {
                    return cat
                }
                return { message: "Cannot Find" }
            } return { message: "operation only for admin" }
        } return { message: "invalid token" }
    } return { message: "invalid token" }

}

export async function deleteCategory(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })

    if (userExist) {
        const admin = await User.findOne({ username: "admin" })
        if (tokenver) {
            if (tokenver._id == admin._id) {
                const cat = await Category.remove({ name: req.body.name })
                if (cat) {
                    return cat
                }
                return { message: "Cannot Find" }
            } return { message: "operation only for admin" }
        } return { message: "invalid token" }
    } return { message: "invalid token" }

}