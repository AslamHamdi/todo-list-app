const Post = require('../../../Models/Tasks')

exports.getAllTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        data = await data.getAllTasks()
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}