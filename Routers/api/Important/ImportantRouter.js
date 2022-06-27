const Post = require('../../../Models/Important')

exports.getAllImportantTasks = async (req, res, next) => {
    try{
        let data = new Post(req.user)
        data = await data.getAllImportantTasks()
        res.status(200).json({data})
        return data
    }catch(err){
        console.log(err)
        next(err)
    }
}