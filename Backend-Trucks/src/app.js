const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const getRoutes = require("./routes/getProducts");
//MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
//Rutas

//productos

app.use("/", getRoutes);

module.exports = app;
