import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleWare } from "../middlewares/auth.middleware.js";
import { addToDoValidate } from "../middlewares/todo.middleware.js";

const toDoRouter = express.Router();
const prisma = new PrismaClient();

toDoRouter.get("/getAllToDos/:userId", authMiddleWare, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const getAllToDos = await prisma.toDos.findMany({
      where: {
        usersId: userId,
      },
    });
    res.status(200).json({
      userToDos: getAllToDos,
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

toDoRouter.get("/getAllToDos", authMiddleWare, async (req, res) => {
  try {
    const getAllToDos = await prisma.toDos.findMany();
    res.status(200).json({
      getAllToDos,
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

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
