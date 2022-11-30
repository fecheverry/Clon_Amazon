import Cart from "./cart.model.js";
import Product from "../product/product.model.js";

export async function getCart(cart) {
    const c = await Cart.findById(cart.id)
    return c.products
}

export async function addProduct(req) {
    const cart = await Cart.findById(req.id_cart)
    const product = await Product.findById(req.id_product)

    cart.products = cart.products.concat(product._id)

    const newcart = cart.products

    const result = await Cart.updateOne({ _id: req.id_cart }, { $addToSet: { products: newcart } })
    return result
}


export async function deleteProduct(req) {
    const cart = await Cart.findById(req.id_cart)
    const product = await Product.findById(req.id_product)

    const cart_id = cart._id
    const product_id = product._id
    const result = await Cart.updateOne({ _id: cart_id }, { $pullAll: { products: [product_id] } })
    return result

}

export async function buyCart(cart) {

}