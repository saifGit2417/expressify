import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleWare } from "../middlewares/auth.middleware.js";
import {
  addToDoValidate,
  updateToDoValidate,
} from "../middlewares/todo.middleware.js";

const toDoRouter = express.Router();
const prisma = new PrismaClient();
toDoRouter.use(authMiddleWare);

// http://localhost:3333/api/v1/todo/getAllToDos/3
toDoRouter.get("/getAllToDos/:userId", async (req, res) => {
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

toDoRouter.get("/getAllToDos", async (req, res) => {
  try {
    const getAllToDos = await prisma.toDos.findMany();
    res.status(200).json({
      getAllToDos,
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

toDoRouter.post("/add", addToDoValidate, async (req, res) => {
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

/*
http://localhost:3333/api/v1/todo/editToDo/5
body requires
*/
toDoRouter.put("/editToDo/:toDoId", updateToDoValidate, async (req, res) => {
  try {
    const toDoId = parseInt(req.params.toDoId);
    const { title, description } = req.body;
    const updateToDo = await prisma.toDos.update({
      where: {
        id: toDoId,
      },
      data: {
        title,
        description,
      },
    });
    if (updateToDo) {
      res.status(200).json({
        message: "to do updated successfully",
      });
    }
  } catch (error) {}
});

// http://localhost:3333/api/v1/todo/delete/4
toDoRouter.delete("/delete/:toDoId", async (req, res) => {
  try {
    const toDoId = parseInt(req.params.toDoId);
    const deleteToDo = await prisma.toDos.delete({
      where: {
        id: toDoId,
      },
    });
    if (deleteToDo) {
      res.status(200).json({
        message: "to do deleted successfully",
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});
export default toDoRouter;
