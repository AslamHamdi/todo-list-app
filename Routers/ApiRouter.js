const express = require('express')
const router = express.Router()
const MyDayRouter = require('./api/MyDay/MyDayRouter')
const ImportantRouter = require('./api/Important/ImportantRouter')
const TasksRouter = require('./api/Tasks/TasksRouter')
const PlannedRouter = require('./api/Planned/PlannedRouter')


//MyDay api Router
router
    .route("/MyDayRouter")
    .get(MyDayRouter.getAllUsers)
    .post(MyDayRouter.getAllUsers)
    
router
    .route("/addNewtask")
    .get(MyDayRouter.addNewTask)
    .post(MyDayRouter.addNewTask)

router
    .route("/getAllTodayTasks")
    .get(MyDayRouter.getAllTodayTasks)
    .post(MyDayRouter.getAllTodayTasks)

router
    .route("/deleteTask")
    .get(MyDayRouter.deleteTask)
    .post(MyDayRouter.deleteTask)

router
    .route("/addOrRemoveImportantTask")
    .get(MyDayRouter.addOrRemoveImportantTask)
    .post(MyDayRouter.addOrRemoveImportantTask)

router
    .route("/addOrRemoveCompletedTask")
    .get(MyDayRouter.addOrRemoveCompletedTask)
    .post(MyDayRouter.addOrRemoveCompletedTask)

// Important api router
router
    .route("/getAllImportantTasks")
    .get(ImportantRouter.getAllImportantTasks)
    .post(ImportantRouter.getAllImportantTasks)

// Tasks api router
router
    .route("/getAllTasks")
    .get(TasksRouter.getAllTasks)
    .post(TasksRouter.getAllTasks)

// Planned api router
router
    .route("/getAllOverdueTasks")
    .get(PlannedRouter.getAllOverdueTasks)
    .post(PlannedRouter.getAllOverdueTasks)

router
    .route("/getAllTomorrowTasks")
    .get(PlannedRouter.getAllTomorrowTasks)
    .post(PlannedRouter.getAllTomorrowTasks)

router
    .route("/getAllThisWeekTasks")
    .get(PlannedRouter.getAllThisWeekTasks)
    .post(PlannedRouter.getAllThisWeekTasks)

router
    .route("/getAllPlannedTasks")
    .get(PlannedRouter.getAllPlannedTasks)
    .post(PlannedRouter.getAllPlannedTasks)
    


module.exports = router