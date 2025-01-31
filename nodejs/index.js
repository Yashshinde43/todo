import express from "express";
import userRoute from "./routes/userRoutes.js";
import connectDB from "./database.js";
import cors from "cors";
import todoRoute from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

//DB connection
connectDB();
//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// app.use('todo', todoRoute)
app.use('/api', userRoute);
app.use('/', todoRoute);



app.listen(5000, () => {
console.log(`server is running`);
})