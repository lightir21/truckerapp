import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "please provide userName"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    trim: true,
    default: "שם פרטי",
  },
  lastName: {
    type: String,
    trim: true,
    default: "שם משפחה",
  },
  role: {
    type: String,
    required: [true, "User must have a role"],
    enum: ["admin", "driver"],
    default: "driver",
  },
  truckNum: {
    type: Number,
    minlength: 7,
  },
  image: {
    type: String,
    default: "",
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.createJWT = function () {
  console.log(this._id);
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
