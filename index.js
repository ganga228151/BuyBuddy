import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/connectDB.js";
import { productRouter } from "./routes/product.route.js";
import { userRouter } from "./routes/user.route.js";
const port = process.env.PORT || 8000;
// import bodyParser from "body-parser";
const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// connect db 
connectDB();

app.use("/api/product",productRouter);
app.use("/api/user",userRouter);


app.listen(port, () => {
    console.log("server running on port ", port);
});
