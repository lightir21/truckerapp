import "express-async-errors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// DB
import connectDB from "./db/connect.js";

// Routers
import authRouter from "./routes/authRoutes.js";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "well met!" });
});

app.use("/api/v1/auth", authRouter);

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
