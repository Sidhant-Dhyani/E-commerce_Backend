const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const User = require("./models/Users");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
const checkoutRoute = require("./routes/checkout.js");
const port = 4000;
const atlas =
  "mongodb+srv://siddhantydhyani99:bQoo2WvXC2hpG4Qe@cluster0.zkaq95y.mongodb.net/ReduxEcommerce";

const connectToDB = async (req, res) => {
  try {
    await mongoose.connect(atlas);
    console.log("Connected to atlas DB!!");
  } catch (error) {
    console.error(error);
  }
};
connectToDB();

app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/checkout", checkoutRoute);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/userInfo/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.fullName);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}!!!`);
});
