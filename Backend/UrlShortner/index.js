const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const connectDB = require('./database/index.js')
const urlRouter = require('./routes/urlRoutes.js')
const URL = require('./models/url.model.js')
const staticRouter = require('./routes/staticRoutes.js')
const userRouter = require('./routes/userRoutes.js')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))
app.use(express.static(path.resolve('./public')))

app.use('/api/v1/url', urlRouter)
app.use('/api/v1/user', userRouter)
app.use('/', staticRouter)
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                clickCount: Date.now()
            }
        }
    })
    if (entry?.redirectURL) {

        res.redirect(entry.redirectURL)
    }
})


connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
