const Post = require('../../Models/Auth')

exports.registerUser = async (req, res, next) => {
    try{
        let data = new Post()
        let payload = req.body.data
        data = await data.getAllUsers(payload);
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        next(err)
    }
}