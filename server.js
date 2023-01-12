import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

// DB
import connectDB from "./db/connect.js";

// Routers
import authRouter from "./routes/authRoutes.js";
import driverRouter from "./routes/driverRoutes.js";
import jobRouter from "./routes/jobRoutes.js";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/v1", (req, res) => {
  res.json({ msg: "well met!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/job", jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
