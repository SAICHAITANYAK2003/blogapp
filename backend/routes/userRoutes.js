import express from "express";
import { requireAuth } from "@clerk/express";
import { upsertUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/user/upsert", requireAuth(), upsertUser);

export default userRouter;
