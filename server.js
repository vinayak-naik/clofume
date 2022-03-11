const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const db = require("./config/db");

const app = express();

dotenv.config();

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

app.use(express.static('static'))

// DB Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./routes/userRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/vendor", require("./routes/vendorRouter"));
app.use("/product", require("./routes/productRouter"));

module.exports = app;