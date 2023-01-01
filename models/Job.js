import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "job must have a date"],
  },
  customer: {
    type: String,
  },
  startLocation: {
    type: String,
  },
  time: {
    type: String,
  },
  destination: {
    type: String,
  },
  craneType: {
    type: String,
  },
  departmentNum: {
    type: String,
  },
  invitationNum: {
    type: String,
  },
  contact1: {
    type: String,
  },
  contact2: {
    type: String,
  },
  others: {
    type: String,
  },
  createdFor: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide driver"],
  },
});

export default mongoose.model("Job", JobSchema);
