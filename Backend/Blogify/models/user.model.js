const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    salt: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileurl: { type: String, default: '/images/default.png' }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.salt = bcrypt.genSaltSync(10);
        // this.password = createHmac('sha256', this.salt).update(this.password).digest("hex")
        this.password = bcrypt.hashSync(this.password, this.salt);
    }
    next()
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            profileurl: this.profileurl
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const USER = mongoose.model('buser', userSchema)

module.exports = USER