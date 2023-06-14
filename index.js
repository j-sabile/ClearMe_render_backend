import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import setUpRoutes from "./routes.js";
import dotenv from "dotenv";

dotenv.config();
const DATABASE_URI = process.env.DATABASE_URI;
const REACT_APP_LINK = process.env.REACT_APP_LINK;

// initialize the server
const app = express();

await mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors({ origin: process.env.REACT_APP_LINK, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// allow CORS

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", REACT_APP_LINK);
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
//   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type,X-Requested-With,Cookie");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

// setup routes
setUpRoutes(app);

// start server
app.listen(3001, () => {
  console.log("API listening to port 3001 ");
});
