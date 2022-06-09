const Post = require('../../../Models/MyDay')

exports.getAllUsers = async (req, res, next) => {
    try{
        //let data = new Post()
        let data = await Post.getAllUsers()
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.getAllTasks = async (req, res, next) => {
    try{
        let data = new Post()
        data = await data.getAllTasks()
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
    //res.send("Add TASK")
}
