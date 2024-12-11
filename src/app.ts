import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import routeRegister from "./routes/inti";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

routeRegister(app);
export default app;
