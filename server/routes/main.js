import express from "express";
import userRouter from "./users.js";
import toDoRouter from "./todos.js";
const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/todo", toDoRouter);

export default mainRouter;
