import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleWare } from "../middlewares/auth.middleware.js";
import { addToDoValidate } from "../middlewares/todo.middleware.js";

const toDoRouter = express.Router();
const prisma = new PrismaClient();

toDoRouter.post("/add", authMiddleWare, addToDoValidate, async (req, res) => {
  try {
    const { userId } = req.headers;
    const { title, description } = req.body;
    const addNewTodO = await prisma.toDos.create({
      data: {
        title,
        description,
        usersId: userId,
      },
    });
    if (addNewTodO) {
      res.status(200).json({
        message: "new task added successfully",
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

export default toDoRouter;
