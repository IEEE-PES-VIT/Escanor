import express, { Request, Response } from "express";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { client } from "../config/redis";
import { io } from "../app";
const router = express.Router();

const sendMessages = (
  _socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  client.lrange("messages", 0, -1, (_err, reply) => {
    reply.map((msg) => {
      let messageSplit = msg.split(":");
      let redisUsername = messageSplit[0];
      let redisMessage = messageSplit[1];

      io.emit("message", { message: redisMessage, from: redisUsername });
    });
  });
};

io.on("connection", (socket) => {
  sendMessages(socket);

  socket.on(
    "message",
    ({ message, from }: { message: string; from: string }) => {
      console.log(`${from}: ${message}`);

      client.rpush("messages", `${from}:${message}`);

      io.emit("message", { message, from });
    }
  );
});

router.get("/", (_req: Request, res: Response) => {
  res.render("index");
});

router.get("/chat", (req: Request, res: Response) => {
  const username = req.query.username;

  // io.on("connection", (_socket) => {
  //   io.emit("joined", username);
  //   // console.log(`Socket Id: ${socket.id} joined the chat!`);
  // });

  io.emit("joined", username);

  console.log(`${username} joined the chat!`);

  res.render("chat", { username });
});

export default router;
