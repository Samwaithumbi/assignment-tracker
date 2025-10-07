const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    subject: String,
    dueDate: Date,
    status: { 
      type: String, 
      enum: ["not started", "in progress", "completed"], 
      default: "not started" 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin or student
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // student
  });
  
  module.exports = mongoose.model("Assignment", assignmentSchema);
  