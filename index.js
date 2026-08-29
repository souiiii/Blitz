import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "./routes/authRoute";
import linkRoute from "./routes/linkRoute";

const PORT = process.env.PORT || 8000;
const path = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());

app.use("/user", authRoute);
app.use("/links", linkRoute);

connectMongo(path).then(() =>
  app.listen(PORT, () => console.log("mongo db connected and server started")),
);
