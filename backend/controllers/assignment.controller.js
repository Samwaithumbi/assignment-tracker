const Assignment = require('../models/assignments.model');

//getting all assignments
const getAssignments= async(req, res)=>{
    try {
        const assignments=await Assignment.find()
        res.status(201).json(assignments)
    } catch (error) {
        console.log(error.message);
    }
}  

//get a single assignment by id
const getAssignmentById = async(req, res)=>{
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Create a new assignment
const addAssignment = async (req, res) => {
    try {
      const assignment = new Assignment({
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject,
        dueDate: req.body.dueDate,
        status: req.body.status,
        createdBy: req.user.id, // student or admin ID
      });
  
      await assignment.save();
      res.status(201).json(assignment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// Delete an assignment
const deleteAssignment=async (req, res)=>{
    try {
        const {id}=req.params
        await Assignment.findByIdAndDelete(id)
        res.status(200).json({message:'Assignment deleted successfully'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//update an assignment
const updateAssignment=async (req, res)=>{
    try {
        const {id}=req.params
        const {title, unit, dueDate, status}=req.body
        const assignment=await Assignment.findByIdAndUpdate(id, {title, unit, dueDate, completed}, {new:true})
        res.status(200).json(assignment)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


module.exports={addAssignment, getAssignments, deleteAssignment, updateAssignment, getAssignmentById}