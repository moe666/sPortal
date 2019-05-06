import express from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../controllers/mailer";

const router = express.Router();

//login
router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

//find user and update user record
router.post("/confirmation", (req, res) => {
  const token = req.body.token;
  console.log("ROUTES CONFIRMATION", token);

  User.findOneAndUpdate(
    //first param: what we are searching for
    //second param: what we want to update
    //third param: options
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(user =>
    user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
});

//reset password rout
router.post("/reset_password_request", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res.status(400).json({ errors: { global: "There is no such user " } });
    }
  });
});

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
});

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid Token" } });
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(404).json({ errors: { global: "Invalid Token" } });
        }
      });
    }
  });
});

export default router;
