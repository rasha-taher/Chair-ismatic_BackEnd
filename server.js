require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (error) =>
  console.error.bind(error, "Error when connceting to database")
);
db.once("open", () => console.log(" Connected to Database"));

const categoryRoute = require("./routes/categoriesRoutes");
app.use("/category", categoryRoute);

const userRoute = require("./routes/UsersRoutes");
app.use("/user", userRoute);

const productRoute = require("./routes/ProductRoutes");
app.use("/product", productRoute);

const billRoute = require("./routes/BillRoutes");
app.use("/bill", billRoute);

const conversationRoute = require("./routes/ConversationRoutes");
app.use("/conversation", conversationRoute);

const messageRoute = require("./routes/MessageRoutes");
app.use("/message", messageRoute); 

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
 
const addUser = (userEmail, socketId) => {
  !users.some((user) => user.email === userEmail) &&
    users.push({ userEmail, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userEmail) => {
  return users.find((user) => user.email === userEmail);
}; 

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userEmail) => {
    addUser(userEmail, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderEmail, receiverEmail, text }) => {
    const user = getUser(receiverEmail);
    io.to(user.socketId).emit("getMessage", {
      senderEmail,
      text,
    }); 
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});