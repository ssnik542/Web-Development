import express from "express";
import { PORT } from "./config";
import { userRouter } from "./routes/userRouter";
import erroHandler from "./middlewares/errorHandler";
import connectDB from "./database";
import { productRouter } from "./routes/productRouter";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use(erroHandler)

connectDB().then(() => {
    app.listen(PORT || 5000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
