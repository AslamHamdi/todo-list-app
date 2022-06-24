const Post = require('../../Models/Auth')

exports.registerUser = async (req, res, next) => {
    try{
        let data = new Post()
        let payload = req.body.data
        data = await data.registerUser(payload);
        if(!data.status){
            res.status(400).json(data)
        }else{
            res.status(200).json(data)
        }
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.loginLocal = async (req, res, next) => {
    try{
        let data = new Post()
        let payload = req.body.data
        data = await data.loginLocal(payload);
        if(!data.status){
            res.status(409).json(data)
        }else{
            res.status(200).json(data)
        }
    }catch(err){
        console.log(err)
        next(err)
    }
}