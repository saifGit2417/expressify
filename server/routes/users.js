import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {
  signInValidateDetails,
  signUpValidateDetails,
} from "../middlewares/users.middleware.js";
import { JWT_SECRET_KEY } from "../config.js";

const userRouter = express.Router();
const prisma = new PrismaClient();

const saltRounds = 10;

userRouter.post("/signUp", signUpValidateDetails, async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const userEmailExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (userEmailExist != null) {
      res.json({
        message: `email is already registered ${email}`,
      });
    } else {
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const addNewUser = await prisma.users.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
      if (addNewUser) {
        res.json({
          message: "new user created successfully",
          details: {
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
        });
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

userRouter.post("/signIn", signInValidateDetails, async (req, res) => {
  try {
    const { password, email } = req.body;

    const findSignInUser = await prisma.users.findUnique({
      where: { email },
    });
    if (!findSignInUser) {
      res.status(400).json({
        message: `no user found with ${email}`,
      });
    } else {
      const storedUserPassword = findSignInUser?.password;
      const userEmail = findSignInUser?.email;
      const userId = findSignInUser?.id;
      const comparePassword = bcrypt.compareSync(password, storedUserPassword);
      if (!comparePassword) {
        res.status(400).json({
          message: "please enter correct password",
        });
      } else {
        const generateJwt = jsonwebtoken.sign(
          { userEmail, userId },
          JWT_SECRET_KEY
        );
        res.status(200).json({
          message: "user log in successfully",
          token: generateJwt,
        });
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

export default userRouter;
