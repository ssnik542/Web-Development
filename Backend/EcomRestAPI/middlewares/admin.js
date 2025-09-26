import { USER } from "../models"
import CustomErrorHandler from "../services/customErrorHandler"

const admin = async (req, res, next) => {
    try {
        const user = await USER.findOne({ _id: req.user._id })
        if (user.role === 'admin') {
            next()
        } else {
            return next(CustomErrorHandler.unAuthorized())
        }
    } catch (error) {
        return next(error)
    }
}

export default admin