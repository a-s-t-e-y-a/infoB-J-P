import express from "express";
import mainRouter from "./mainRoute";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware
import { verifyToken } from "./middleware/auth";
import upload from "./middleware/upload";
import { Authenticate } from "./interfaces/requestInterface";
import { responseSuccess } from "./utlis/responseSuccess";
import { Response } from "express";

const port: number = process.env.PORT ? Number(process.env.PORT) : 5555;

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));
// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Use th cors middleware to allow requests from "http://localhost:3000"

app.get("/", (req, res) => {
  console.log("a");
  res.send({ message: "Hello API" });
});
app.get("/checkToken", verifyToken);
app.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  (req: Authenticate, res: Response) => {
    responseSuccess(res, {
      data: {
        mes :'image uplaod done '
      },
      message: "upload done",
      status: 200,
    });
  },
);
app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
