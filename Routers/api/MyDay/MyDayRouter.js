const Post = require('../../../Models/MyDay')

exports.getAllTodayTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        data = await data.getAllTodayTasks()
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.addNewTask = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        let payload = req.body.data
        data = await data.addNewTask(payload);
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        let data = new Post(req.user)
        let payload = req.body.data
        data = await data.deleteTask(payload)
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.addOrRemoveImportantTask = async (req, res, next) => {
    try {
        let data = new Post(req.user)
        let payload = req.body.data
        data = await data.addOrRemoveImportantTask(payload)
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.addOrRemoveCompletedTask = async (req, res, next) => {
    try {
        let data = new Post(req.user)
        let payload = req.body.data
        data = await data.addOrRemoveCompletedTask(payload)
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
