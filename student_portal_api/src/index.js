import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import BluebirdPromise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";

dotenv.config();
const app = express();

//Middlewares
app.use("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.Promise = BluebirdPromise;

//DB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use("/api/auth", auth);
app.use("/api", users);
app.use("/uploads", express.static("./public/uploads/"));

const PORT = process.env.PORT || 8080;

/*app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});*/
app._router.stack // registered routes
  .filter(r => r.route) // take out all the middleware
  .map(r => r.route.path);

app.listen(PORT, () =>
  console.log("Running on localhost:8080", auth.stack.map(r => r.route.path))
);
