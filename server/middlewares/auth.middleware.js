import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config.js";
export const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jsonwebtoken.verify(token, JWT_SECRET_KEY);
    if (!verifyToken) {
      res.status(400).json({
        message: "something went wrong in jwt token verification",
      });
    } else {
      req.headers.userId = verifyToken.userId;
      next();
    }
  } catch (error) {
    console.log("error: ", error);
  }
};
