import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "./routes/authRoute.js";
import linkRoute from "./routes/linkRoute.js";
import { authSoft } from "./middlewares/auth.js";
import connectMongo from "./connection.js";

const PORT = process.env.PORT || 8000;
const path = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blitz";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(authSoft);

app.use("/users", authRoute);
app.use("/links", linkRoute);

connectMongo(path).then(() =>
  app.listen(PORT, () => console.log("mongo db connected and server started")),
);
