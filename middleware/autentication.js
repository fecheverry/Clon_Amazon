import jwt from 'jsonwebtoken'


//generar token 
export async function TokenAssign(user) {
    return jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '2h' })
}

// verificar el token
export async function TokenVerify(token) {
    try {
        return jwt.verify(token, process.env.JWT_KEY)
    } catch (e) {
        return null
    }
}

//middleware 
export async function AuthCheck(req, res, next) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (!tokenver) {
        res.status(409).json("Invalid Token")
    } else {
        if (tokenver._id) {
            next()
        } else {
            res.status(409).json("Invalid Token")
        }
    }
}
