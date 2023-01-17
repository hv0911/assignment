const mongoose = require("mongoose")

const  { Schema } = mongoose;

const taskSchema = new Schema({
    
    task_name:{
        type:String ,

    } ,
    task_place:{
        type:String
    },
    date:{
        type:Date ,
        default:Date.now()
    },
    image:{
        type:String
    },
    category:{
        type:String
    },

    status:{
        type:String ,
        enum:["Active" , "Done"]
    }

})

module.exports = mongoose.model("Task", taskSchema);