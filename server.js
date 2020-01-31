const express = require("express");
const server = express();
const cors = require("cors");
const authRouter = require('./auth/auth-router')
const usersRouter = require('./routes/userRouter')
server.use(cors());
server.use(express.json())

server.get("/", (req, res) => {
  res.status(200).json({api: 'up'})
});

server.use("/api", authRouter);
server.use("/api/users", usersRouter);

module.exports = server;
