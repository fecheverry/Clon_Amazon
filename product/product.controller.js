import User from "../user/user.model.js";
import Product from "./product.model.js";


export async function registerp(req) {
    const idUser = req.idUser
    const userExist = await User.findOne({ _id: idUser })
    if (userExist) {
        if (userExist.token) {
            const newProduct = new Product({
                idUser: req.idUser,
                user: userExist.username,
                name: req.name.toLowerCase(),
                description: req.description,
                price: req.price
            });
            const result = await newProduct.save();
            return result

        } else { return { message: "this operation need autentication" } }
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
    if (req.id.length == 24) {
        const ver = await Product.findById({ _id: req.id })
        if (ver) {
            const ver2 = await User.findById({ _id: ver.idUser })
            if (ver2.token) {
                const result = await Product.remove({ _id: req.id })
                return result
            } else { return { message: "this operation need autentication" } }

        } else { return { message: "Not Found" } }
    } else { return { message: "Invalid ID" } }
}

export async function updatePR(req1, req2) {
    const { id } = req1
    const { name, description, price } = req2
    if (id.length == 24) {
        const product = await Product.findById({ _id: id })
        const user = await User.findById({ _id: product.idUser })
        if (product) {
            if (user.token) {
                const result = await Product.updateOne({ _id: req1.id }, {
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

        } else {
            return { message: "Not Found" }
        }
    } else {
        return { message: "invalid ID" }
    }
}