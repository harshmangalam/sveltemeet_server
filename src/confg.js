exports.PORT = process.env.PORT;
exports.SOCKET_OPTIONS = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
