import { REFRESH } from "../../models"

const logoutController = {
    async logout(req, res, next) {
        try {
            const id = await REFRESH.deleteOne({
                refresh_token: req.body.refresh_token
            })
            res.json(id)
        } catch (error) {
            return next(error)
        }
    }
}

export default logoutController