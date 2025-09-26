const express = require('express')
const path = require('path');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const staticRouter = require('./routes/staticRoutes');
const connectDB = require('./database/index.js');
const userRouter = require('./routes/userRouter.js');
const isUserLogedIn = require('./middleware/users.js');
const blogRouter = require('./routes/blogRouter.js');
const getUser = require('./middleware/blog.js');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.static(path.resolve('./public')))


app.use('/', staticRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/blog', getUser, blogRouter)




connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})