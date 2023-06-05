const authorization = (permission) => {
    return async (req, res, next) => {
        const user = req.user

        if (!user.isAdmin) {
            return res.status(401).send({message:'Authorization error'})
        }

        next()
    }
}

export default authorization