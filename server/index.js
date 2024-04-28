import express from "express";
import mainRouter from "./routes/main.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

app.listen(3333, () => {
  console.log("port running at 3333");
});
