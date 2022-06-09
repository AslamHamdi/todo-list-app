const express = require('express')
const router = express.Router()
const MyDayRouter = require('./api/MyDay/MyDayRouter')

//MyDay Router
router
    .route("/MyDayRouter")
    .get(MyDayRouter.getAllUsers)
    .post(MyDayRouter.getAllUsers)
    
router
    .route("/addNewtask")
    .get(MyDayRouter.addNewTask)
    .post(MyDayRouter.addNewTask)

router
    .route("/getAllTasks")
    .get(MyDayRouter.getAllTasks)
    .post(MyDayRouter.getAllTasks)


module.exports = router