import User from "../user/user.model.js";
import Category from "../category/category.model.js";
import Product from "./product.model.js";
import { TokenVerify } from "../middleware/autentication.js"

export async function registerp(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })
    if (userExist) {
        const category = await Category.findOne({ name: req.body.category.toLowerCase() })
        if (category) {
            if (tokenver) {
                const newProduct = new Product({
                    idUser: userExist._id,
                    user: userExist.username,
                    name: req.body.name.toLowerCase(),
                    description: req.body.description,
                    price: req.body.price
                });
                const result = await newProduct.save();

                const concat = result._id.toString()
                category.products = category.products.concat(concat)
                const products = category.products
                await Category.updateOne({ _id: category._id }, { $addToSet: { products: products } })

                return result

            } else { return { message: "this operation need autentication" } }
        } else { return { message: "Cannot find category" } }
    } else { return { message: "invalid operation" } }
}

export async function getu(req) {
    const product = await Product.find({ user: req.username })
    if (product) {
        return product
    } return { message: "Error" }


}

export async function getind(req) {
    if (req.id.length == 24) {
        const product = await Product.findById({ _id: req.id })
        if (product) {
            return product
        } return { message: "Error" }
    } else { return { message: "Invalid ID" } }
}

export async function getnom(req) {
    const product = await Product.find({ name: req.name.toLowerCase() })
    if (product.length != 0) {
        return product
    } return { message: "Not Found" }

}

export async function removePR(req) {
    const { id } = req.params
    if (id.length == 24) {
        const ver = await Product.findById({ _id: id })
        const token = req.headers.authorization.split(' ').pop()
        const tokenver = await TokenVerify(token)
        if (ver) {
            if (ver.idUser == tokenver._id) {
                if (tokenver) {
                    const result = await Product.remove({ _id: id })
                    return result
                } else { return { message: "this operation need autentication" } }

            } else { return { message: "Error" } }
        } else { return { message: "Not Found" } }
    } else { return { message: "Invalid ID" } }
}

export async function updatePR(req) {
    const { id } = req.params
    const { name, description, price } = req.body
    if (id.length == 24) {
        const product = await Product.findById({ _id: id })
        const token = req.headers.authorization.split(' ').pop()
        const tokenver = await TokenVerify(token)
        if (product) {
            if (product.idUser == tokenver._id) {
                if (tokenver) {
                    const result = await Product.updateOne({ _id: id }, {
                        $set: {
                            name: name.toLowerCase(),
                            description: description,
                            price: price
                        }
                    })
                    return result
                } else {
                    return { message: "this operation need autentication" }
                }

            } else { return { message: "Error" } }
        } else {
            return { message: "Not Found" }
        }
    } else {
        return { message: "invalid ID" }
    }
}


export async function getProductsbyCategory(req) {
    const category = await Category.find({ name: req.name })
    if (category) {
        return category
    } return { message: "Error" }


}