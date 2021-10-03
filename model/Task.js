const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema(
    {
        Type: String,
        Title: String,
        Description: String,
        Suburb: String,
        Date: String,
        BudgetType: String,
        BudgetAmount: String


        
    }
)

module.exports  =  mongoose.model("Task", taskSchema)
