const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);

const cors = require("cors");

require("dotenv").config();

const { PORT, SOCKET_OPTIONS } = require("./confg");

const io = require("socket.io")(server, SOCKET_OPTIONS);

app.use(cors());

app.get("/", (_, res) => {
  res.status(200).json({
    type: "success",
    message: "server up and running",
    data: null,
  });
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("user_disconnect");
  });

  socket.on("offer", (data) => {
    io.to(data.to).emit("offer", data);
  });

  socket.on("offer_reject", (data) => {
    io.to(data.to).emit("offer_rejected", data);
  });

  socket.on("answer", (data) => {
    io.to(data.to).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    io.to(data.to).emit("ice-candidate", data.candidate);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
