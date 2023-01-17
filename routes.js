const express = require("express");
const { createTask , allTasks , viewTaskCategory  , updateStatus , taskDetail } = require("./controllers")
const router = express.Router();


router.post("/task" , createTask )

router.get('/tasks', allTasks );

router.post("/tasks" , viewTaskCategory );

router.get("/taskCategory" , viewTaskCategory);

router.get("/tasks/:id" , taskDetail )

router.put("/tasks/:id" , updateStatus );


module.exports = router ;