const Task = require("./Task");
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination:"images/taskimg",
    filename:(req,file,cb)=>{
        cb(null , file.fieldname + '_' + Date.now() + path.extname(file.originalname)) ;
    }
});

const uploadImage = multer({
    storage:fileStorage,
    limits:{
        fileSize:1000000
    },
    // fileFilter(req , file , cb){
    //     // if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
    //     //     return cb(new Error('Please upload an image!'));
    //     // }
    //     cb(undefined,true)
    // }
})


exports.createTask = [ uploadImage.single('image') , async (req , res , next )=>{

    try {

        const task = new Task();

    if(req.file != undefined){
        task.image = "http://localhost:4000/taskimg/" + req.file.filename ;
    }

    task.task_name = req.body.task_name ,
    task.task_place = req.body.task_place ,
    task.category = req.body.category ,
    task.date = req.body.date ;

    await task.save((err) => {
        if(err){
            return next(err) ;
        }
    })
    
    return res.status(201).json({
        success:true ,
        task:task ,
        message:"task created!"
    })

        
    } catch (error) {
        
        return res.status(500).json({
            success:false ,
            error
        })

    }

    


}]



//   all tasks from the database 
exports.allTasks = async ( req , res , next ) => {

    try {

        const TaskList = await Task.find({}) ;

        if(!TaskList){
            return res.status(404).json({
                success:true ,
                message:"no task added!"
            })
        }
    
        return res.status(201).json({
            success:true ,
            TaskList:TaskList
        })

        
    } catch (error) {
        
        return res.status(500).json({
            success:false ,
            error
        })


    }

}

//  finding task according to the category 
exports.viewTaskCategory = async ( req , res , next ) => {

    try {

        const TaskList = await Task.find({category:req.body.category}) ;

        if(!TaskList){
            return res.status(404).json({
                success:true ,
                message:"no task added!"
            })
        }
    
        return res.status(201).json({
            success:true ,
            TaskList:TaskList
        })

        
    } catch (error) {
        
        return res.status(500).json({
            success:false ,
            error
        })


    }

}

exports.taskDetail = async (req , res , next ) =>{
    try {
        
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({
                success:false ,
                message:"task does not found"
            })
        }

        return res.status(201).json({
            success:true ,
            task:task
        })

    } catch (error) {
        
        return res.status(500).json({
            success:false ,
            error
        })

    }
}





//  update status to done 

exports.updateStatus = async (req , res , next ) => {
    try {
        
        const task = await Task.findById(req.params.id);

        if(task.status === "Active"){
            task.status = "Done"
        }else if(task.status === "Done"){
            task.status = "Active"
        }

        await task.save((err) => {
            if(err){
                return next(err);
            }
        })

        return res.status(201).json({
            success:true ,
            message:"Task status updated to Done"
        })


    } catch (error) {
        
        return res.status(500).json({
            success:false ,
            error
        })


    }
}


//  Task list according to all done , active 

exports.TaskListStatus = async (req , res , next ) =>{

    try {

        const activeTask = await Task.find({status:"Active"});

        const doneTask = await Task.find({status:"Done"}); 
    
        return res.status(201).json({
            success:true ,
            activeTask:activeTask ,
            doneTask:doneTask
        })    
        
    } catch (error) {
        
        return res.status(500).json({
            success:false ,
            error
        })


    }

   

}

