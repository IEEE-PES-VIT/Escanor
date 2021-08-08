import express, { Request, Response, NextFunction } from "express";
import morgan from "./logger/morgan";
require("dotenv-save").config();
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

// Connect to database here
import { initializeRedis } from "./config/redis";
initializeRedis();

// Socket Io connection
const io = new Server(server);

io.on("connect", (socket) => {
  socket.on("start", () => {
    console.log("Socket Connection Established!");
  });
});

// use all the middlewires
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
app.use(morgan);

//Importing routes
import initialRoutes from "./routes/initial.routes";

//Routes
app.use("api/v1/initial", initialRoutes);

app.get("/", (_req, res) => {
  res.send("Escanor Testing");
});

app.get("/api/v1", (_req, res) => {
  res.json({
    message: "Connected To Escanor API",
  });
});

// Global in case Error Handlers
app.use((_req, res, next) => {
  var err = new Error("Not Found");
  res.status(404);
  next(err);
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
    message: "Internal Server Error",
    msgError: true,
  });
});

const port = process.env.PORT || 3003;

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port} 🚀`);
});
