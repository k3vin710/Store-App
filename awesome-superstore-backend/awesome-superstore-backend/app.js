require("dotenv").config();

// import node packages
const express = require("express");
const bodyParser = require("body-parser");

// import routers
const authRouter = require("./routes/auth");
const addressRouter = require("./routes/address");
const customerRouter = require("./routes/customer");
const productRouter = require("./routes/product");
const ordersRouter = require("./routes/orders");

const app = express();

//  CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // If you need to allow credentials
  next();
});

// global middleware
app.use(bodyParser.json());

// routers
app.use("/auth", authRouter);
app.use("/address", addressRouter);
app.use("/customer", customerRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({ message: message, errors: error.data });
  next();
});

app.listen(process.env.PORT);
