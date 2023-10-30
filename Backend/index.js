const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const socketIo = require("socket.io");

const port = 5000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-crop");
  next();
});
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const laundryRouter = require("./routes/laundries");
const customerRouter = require("./routes/customers");
const orderRouter = require("./routes/orders");
const riderRouter = require("./routes/riders");
const pickupRouter = require("./routes/pickups");

app.use("/laundry", laundryRouter);
app.use("/customer", customerRouter);
app.use("/order", orderRouter);
app.use("/rider", riderRouter);
app.use("/pickup", pickupRouter);

const server = app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

const ip = "172.20.10.5";

const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      `exp://172.20.10.5:8081`,
      `exp://172.20.10.5:8082`,
      `exp://172.20.10.5:8083`,
    ],

    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("notification sent");
});

db.once("open", () => {
  // console.log('Connected to MongoDB');

  // Handle new MongoDB document insertions
  const collection = db.collection("orders");
  const changeStream = collection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newDocument = change.fullDocument;
      io.emit("newDocument", newDocument);
    }
  });

  changeStream.on("change", (change) => {
    if (change.operationType === "update") {

      io.emit("update", change.documentKey._id);

    }
  });
});

module.exports = app;
