const user_model = require('../Models/user_model')
let count= 0;

const add_Lists = (req, res)=>{

todo_list = req.body;    
count++

const todoInstance = new user_model({
    "Task_no":count,
    ...todo_list
})
    

todoInstance.save()
.then((savedTodo) => {
    res.status(200).json({ "message": "added successfully", "todo": savedTodo });
})
.catch((err) => {
    console.error("Error saving todo:", err);
    res.status(500).json({ "error": "Failed to add todo" });
});

}



const get_Lists = (req, res)=>{

    let task = req.params.id;

   user_model.find({"Task_no":task})
   .then((required_task)=>{
       if(required_task.length>0){
        res.status(200).json({ "message": "success", "todo": required_task  })
       } else {
        res.status(500).json({ "error": "Given Task number is not present in database " })
       }

   }).catch((err)=>{
       res.status(500).json({ "error": "Failed to get task " });
   })
   
}

const complete_incomplete_task = (req, res) => {
    const task_no = req.params.id;

    user_model.findOne({"Task_no": task_no})
    .then((todo) => {
        if (todo) {
            const newCompleted = !todo.Completed; // Toggle the Completed field
            return user_model.findOneAndUpdate(
                {"Task_no": task_no},
                {"Completed": newCompleted},
                {new : true}
            );
        } else {
            throw new Error("Given Task number is not present in database");
        }
    })
    .then((updatedTodo) => {
        res.status(200).json({ "message": "Response added successfully", "todo": updatedTodo });
    })
    .catch((err) => {
        res.status(500).json({ "error": err.message });
    });
}



const delete_task = (req, res) => {
     
    const task_no = req.params.id;

    user_model.deleteOne({"Task_no": task_no})
    .then((deleted_task)=>{
        if(deleted_task){
            res.status(200).json({ "message": "Deleted successfully", "todo": deleted_task  })      
           } else {
            res.status(500).json({ "error": "Given Task number is not present in database " })
           }
     }).catch((err)=>{
        res.status(500).json({ "error": "Didn't get response", "error": err }); 
    })
}


module.exports = {add_Lists, get_Lists, complete_incomplete_task, delete_task}