const app = require("./app");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Chat = require("./models/Chat.model");

const server = http.createServer(app);
app.use(cors());
// connect socket io server with express one that we created
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // events will be used here because should only be listening to events if were connected.
  console.log(`socket connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    console.log(data, "hey");

    try {
      const createdMessage = await Chat.create({
        user: data.user,
        time: data.time,
        message: data.message,
      });

      socket.emit("all_chat", findAllofChat);
    } catch (error) {
      console.log(error);
    }

    socket.emit("receive_message", data);
  });
  //   leaving tab or disconnecting from server
  socket.on("disconnect", () => {
    console.log("socket disconnected or closed tab", socket.id);
  });
});
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

server.listen(5005, () => {
  console.log(`Server listening on port http://localhost:5005`);
});
