const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignments.model");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Create assignment 
router.post("/", protect, authorize("admin", "student"), async (req, res) => {
  const { title, description, subject, dueDate, assignedTo } = req.body;

  const assignment = new Assignment({
    title,
    description,
    subject,
    dueDate,
    createdBy: req.user._id,
    assignedTo,
  });

  const createdAssignment = await assignment.save();
  res.status(201).json(createdAssignment);
});

// Student: get only their assignments
router.get("/", protect, async (req, res) => {
  try {
    const query =
      req.user.role === "admin"
        ? {}
        : { createdBy: req.user.id };

    const assignments = await Assignment.find(query).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Student can update only their own assignments
router.put("/:id", protect, async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) return res.status(404).json({ message: "Not found" });

  if (req.user.role === "student" && assignment.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  Object.assign(assignment, req.body);
  const updated = await assignment.save();
  res.json(updated);
});

module.exports = router;
