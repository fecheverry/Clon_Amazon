import Cart from "./cart.model.js";
import Product from "../product/product.model.js";
import User from "../user/user.model.js";
import { TokenVerify } from "../middleware/autentication.js"

export async function getCart(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })

    if (userExist) {
        const cart = await Cart.findOne({ idUser: tokenver._id })
        if (tokenver) {
            if (!cart) {
                return { message: "Empty" }
            } return cart
        } { return { message: "invalid token" } }
    } else { return { message: "invalid token" } }
}

export async function addProduct(req) {
    if (req.body.idProduct.length == 24) {
        const token = req.headers.authorization.split(' ').pop()
        const tokenver = await TokenVerify(token)
        const userExist = await User.findOne({ _id: tokenver._id })

        if (userExist) {
            const cart = await Cart.findOne({ idUser: tokenver._id })
            if (tokenver) {
                if (!cart) {
                    const newCart = new Cart({
                        idUser: userExist._id,
                        user: userExist.username,
                        products: [],
                        total: 0
                    });
                    await newCart.save();
                }
                const product = await Product.findById(req.body.idProduct)
                if (product) {
                    const cart = await Cart.findOne({ idUser: tokenver._id })
                    if (userExist._id.toString() == cart.idUser.toString()) {
                        const concat = product._id.toString()
                        await Cart.updateOne({ _id: cart._id }, { $push: { products: concat } })
                        const new_total = cart.total + product.price
                        await Cart.updateOne({ _id: cart._id }, { total: new_total })
                        const final = await Cart.findById(cart._id)
                        return final
                    } return { message: "Error" }
                } return { message: "canot find product" }
            } return { message: "invalid token" }
        } return { message: "invalid token" }
    } return { message: "invalid ID" }
}


export async function deleteProduct(req) {

    if (req.body.idProduct.length == 24) {
        const token = req.headers.authorization.split(' ').pop()
        const tokenver = await TokenVerify(token)
        const userExist = await User.findOne({ _id: tokenver._id })

        if (userExist) {
            const cart = await Cart.findOne({ idUser: tokenver._id })
            if (tokenver) {
                if (!cart) {
                    return { message: "is Empty" }
                } else {
                    const product = await Product.findById(req.body.idProduct)
                    if (product) {
                        const concat = product._id.toString()
                        if (cart.products.indexOf(concat) != -1) {
                            const index = cart.products.indexOf(concat)
                            cart.products.splice(index, 1)
                            const final = await Cart.updateOne({ _id: cart._id }, { products: cart.products })
                            const new_total = cart.total - product.price
                            await Cart.updateOne({ _id: cart._id }, { total: new_total })
                            await Cart.findById(cart._id)
                            return final
                        } else { return { message: "Cannot find product" } }
                    } else { return { message: "Cannot find product" } }
                }
            } else { return { message: "invalid token" } }
        } else { return { message: "invalid token" } }
    } else { return { message: "invalid ID" } }

}
