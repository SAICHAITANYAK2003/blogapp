import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiDataRouter from "./routes/apiDataRoute.js";
import { clerkMiddleware } from "@clerk/express";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  clerkMiddleware({
    publishableKey: process.env.PUBLISHABLE_KEY,
    secretKey: process.env.SECRET_KEY,
  })
);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Welcome to Blog App");
});

app.use("/api", apiDataRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);

//Server Port Listening
app.listen(port, () => {
  console.log("Server is working");
});
