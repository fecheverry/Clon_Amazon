import Order from "./order.model.js"
import Cart from "../cart/cart.model.js"
import User from "../user/user.model.js"
import { TokenVerify } from "../middleware/autentication.js"

export async function buyCart(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })

    if (userExist) {
        const cart = await Cart.findOne({ idUser: userExist._id })
        if (tokenver) {
            if (cart.products.lenght != 0) {
                const order = new Order({
                    idUser: cart.idUser,
                    user: cart.user,
                    products: cart.products,
                    total: cart.total
                })
                const cart2 = await Cart.findOneAndUpdate({ idUser: userExist._id }, { products: [], total: 0 })
                const result = await order.save()
                return result

            } else { return { message: "there are no products in the cart" } }
        } else { return { message: "this operation need autenticationt" } }
    } else { return { message: "this user not exist" } }
}

export async function OrdersByUser(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    const userExist = await User.findOne({ _id: tokenver._id })

    if (userExist) {
        if (tokenver) {
            const order = await Order.find({ idUser: userExist._id })
            if (order.length != 0) {
                return order
            } else { return { message: "you have no purchases" } }
        } else { return { message: "this operation need autenticationt" } }
    } else { return { message: "this user not exist" } }
}
