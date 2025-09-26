import Joi from "joi"
import CustomErrorHandler from "../../services/customErrorHandler";
import { REFRESH, USER } from "../../models";
import bcrypt from 'bcrypt'
import JwtService from "../../services/JwtService";
import { REFERESH_SECRET } from "../../config";
const registerController = {
    async register(req, res, next) {
        const { name, email, password } = req.body;

        // validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })
        const { error } = registerSchema.validate(req.body)
        if (error) {
            return next(error);
        }

        // check if user is in the database already
        try {
            const exist = await USER.exists({ email });
            if (exist) {
                return next(CustomErrorHandler.alreadyUserExist('This Email is already Registered'))
            }
        } catch (error) {
            console.log("ERROR IN CHECKING IF THE EMAIL EXISTS : ", error);
            return next(error);

        }

        //Hash Password
        const hashedPsd = await bcrypt.hash(password, 10);

        // prepare the model
        let access_token;
        let refresh_token;
        try {
            const user = await USER.create({
                name, email, password: hashedPsd
            })
            access_token = JwtService.sign({
                _id: user._id,
                role: user.role
            })

            refresh_token = JwtService.sign({
                _id: user._id,
                role: user.role
            }, '1y', REFERESH_SECRET)

            await REFRESH.create({
                refresh_token
            })
        } catch (error) {
            return next(error);
        }


        res.json({ access_token, refresh_token })
    }
}

export default registerController