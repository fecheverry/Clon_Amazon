import User from "./user.model.js";
import bcrypt from 'bcryptjs'
import { TokenAssign, TokenVerify } from "../middleware/autentication.js"

export async function seeu() {
    try {
        const user = User.find()
        return user
    } catch (error) {
        return res.json({ error: error });
    }
}

export async function registeru(req) {

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.password, salt);
    req.password = hashPassword;
    const user = new User({
        username: req.username,
        email: req.email,
        password: req.password
    });
    const result = await user.save()
    return result
}

export async function loginu(req) {
    const password = req.password
    const userExist = await User.findOne({ username: req.username })
    if (userExist) {
        const isPasswordMatched = await bcrypt.compare(password, userExist.password)
        if (isPasswordMatched) {
            const token = await TokenAssign(userExist)
            await User.updateOne({ username: req.username }, { token: true })
            return { token: token }
        } return { mesage: "incorrect password" }
    }else{return{message:"cannot find user"}}
}

export async function logint(req) {
    if (req.id.length == 24) {
        const user = await User.findById({ _id: req.id })
        if (user) {
            const token = await TokenAssign(user)
            await User.updateOne({ _id: req.id }, { token: true })
            return { token: token }
        } else {
            return { message: "user does not exist" }
        }
    } else {
        return { message: "invalid ID" }
    }

}

export async function removeUS(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const result = await User.remove({ _id: tokenver._id })
        return result
    } else {
        return { message: "this operation need autentication" }
    }
}

export async function updateUS(req) {
    const { username, email, password } = req.body
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const result = await User.updateOne({ _id: tokenver._id }, {
            $set: {
                username, email, password: hashPassword
            }
        })
        return result
    } else {
        return { message: "this operation need autentication" }
    }
}

