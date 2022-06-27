const Post = require('../../../Models/Planned')

exports.getAllOverdueTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        data = await data.getAllOverdueTasks()
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.getAllTomorrowTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        data = await data.getAllTomorrowTasks()
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.getAllThisWeekTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        let payload = req.body.data
        data = await data.getAllThisWeekTasks(payload)
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.getAllPlannedTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        data = await data.getAllPlannedTasks()
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}
