const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");;
const path = require("path");

const _dirname = path.resolve();

console.log(_dirname);


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*" , (req , res) => {
    res.sendFile(path.join(_dirname, "/frontend/dist", "index.html"));
})

connectDB();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});