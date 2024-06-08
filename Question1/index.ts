import * as dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
const PORT = process.env.PORT || 5000;
const app: Application = express();
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(`/${process.env.VERSION}`, require("./routes/index"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello, Welcome To This Page",
  });
});

app.listen(PORT, () => {
  console.log(`Server is live at PORT: ${PORT}`);
});
