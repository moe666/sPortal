import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      default: "",
      required: true
    },
    lastName: {
      type: String,
      default: "",
      required: true
    },
    location: {
      type: String,
      default: "",
      required: true
    },
    studentClass: {
      type: Number,
      default: "",
      required: true
    },
    mainFocus: {
      type: String,
      default: ""
    },
    availability: {
      type: Date,
      default: ""
    },
    linkedInLink: {
      type: String,
      default: ""
    },
    xingLink: {
      type: String,
      default: ""
    },
    githubLink: {
      type: String,
      default: ""
    },
    portfolioLink: {
      type: String,
      default: ""
    },
    userImage: {
      type: String,
      default: ""
    },
    confirmationEmailSend: {
      type: Boolean,
      default: false
    },
    confirmationToken: {
      type: String,
      default: ""
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

//Compare user password during login
UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

//Hashing ans salting password
UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

//Store confirmation token
UserSchema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJTW();
};

UserSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

//Create JWT
//encode user ID
//add expreration date 1 hour
//NOT saving into DB
UserSchema.methods.generateResetPasswordUrl = function generateResetPasswordUrl() {
  return `${
    process.env.HOST
  }/reset_password/${this.generateResetPasswordToken()}`;
};

//generate Reset Password JWT
UserSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//generate JWT
UserSchema.methods.generateJTW = function generateJTW() {
  return jwt.sign(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      confirmed: this.confirmed,
      isAdmin: this.isAdmin
    },
    process.env.JWT_SECRET
  );
};

//return user json
UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    confirmed: this.confirmed,
    isAdmin: this.isAdmin,
    token: this.generateJTW()
  };
};

UserSchema.plugin(uniqueValidator, { message: "This email is already in use" });

export default mongoose.model("User", UserSchema);
