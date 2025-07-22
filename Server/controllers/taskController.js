const Task=require("../models/Task");// loading the Task model from the models folder.


//POST/api/tasks
exports.createTask=async(req,res)=>{
    const task=await Task.create({...req.body,owner:req.user.id});
   // req.body = The data sent from the frontend (e.g. title, description).
    //{...req.body, owner: req.user.id} = Adds a new field called owner, which holds the ID of the logged-in user.
    //Creates a task and links it to the user
    res.json(task);
};
//Get/api/tasks/me=Gets only the logged-in user's tasks
exports.getMyTasks=async(req,res)=>{
    const tasks=await Task.find({owner:req.user.id});
    // Searches for tasks where the owner matches the logged-in user.
    res.json(tasks);
};
//Get/api/tasks/all=Gets all tasks + email of each creator
exports.getAllTasks=async(req,res)=>{
    const tasks=await Task.find().populate("owner","username email");
    //Instead of just showing owner IDs, it shows their email by joining with the user collection.
    res.json(tasks);
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if user owns the task or is admin
        if (task.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if user owns the task or is admin
        if (task.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this task" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};