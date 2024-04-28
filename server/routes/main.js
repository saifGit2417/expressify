import express from "express";
import userRouter from "./users.js";
const mainRouter = express.Router();

mainRouter.use("/users", userRouter);

export default mainRouter;
