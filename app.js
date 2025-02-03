if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();

const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:8081"],
  credentials: true
}));

app.use(express.urlencoded( { extended: true }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

module.exports = app;