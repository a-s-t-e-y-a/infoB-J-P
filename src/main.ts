import express from "express";
import mainRouter from "./mainRoute";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware
import { verifyToken } from "./middleware/auth";

const port: number = process.env.PORT ? Number(process.env.PORT) : 5555;

const app = express();

app.use(cors({ origin: '*' })); // Set the origin option to '*'

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("a");
  res.send({ message: "Hello API" });
});
app.get("/checkToken", verifyToken);

app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});

