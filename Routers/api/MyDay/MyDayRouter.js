const Post = require('../../../Models/MyDay')

exports.getAllUsers = async (req, res, next) => {
    try{
        let data = await Post.getAllUsers()
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.getAllTodayTasks = async (req, res, next) => {
    try{
        let data = new Post()
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
        let data = new Post()
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
        let data = new Post()
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
        let data = new Post()
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
        let data = new Post()
        let payload = req.body.data
        data = await data.addOrRemoveCompletedTask(payload)
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
