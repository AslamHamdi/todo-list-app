const db = require('../Config/db')
const bcrypt =  require('bcrypt')


class Post {
    constructor(){

    }

    async registerUser(payload){
        let data = payload
        let emailAlreadyExist = await this.isEmailAlreadyExist(data.email)
        let result = {}
        if(emailAlreadyExist){
            result.status = false
            result.data = "Email already registered. Please use other email";
        }else{
            const salt = await bcrypt.genSalt(10);
            let hashed = await bcrypt.hash(data.passWord, salt);
            let sql = "call sp_user(?, ?, ?, ?, ?, ?, ?, ?);"
            result.data = await db.query(sql,
                [1, data.firstName, data.lastName, data.userName, data.email, hashed, "local", null], function(err, result){
                    if(err){
                        console.log("err:", err)
                    }else{
                        console.log("result: ", result)
                    }
                });
            result.status = true
        }
        return result
    }

    async loginLocal(payload){
        let data = payload
        let result = {}
        let sql = "call sp_user(?, ?, ?, ?, ?, ?, ?, ?);"
        result.data = await db.query(sql,
            [2, null, null, null, data, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        let result2 = result.data['0'][0]
        if(result2.length == 0 || result2.length == undefined){
            result.data = "There is no user registered with this email"
            result.status = false
        }else{
            result.status = true
        }
        return result
    }

    async getUserById(userid, callback){
        let data = userid
        let result = {}
        let sql = "call sp_user(?, ?, ?, ?, ?, ?, ?, ?);"
        result.data = await db.query(sql,
            [3, null, null, null, null, null, null, data], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        let result2 = result.data['0'][0]
        //console.log("GET BY ID: ", result)
        if(result2.length == 0 || result2.length == undefined){
            result.data = "User with this id not found"
            result.status = false
        }else{
            result.status = true
        }
        return await result2
    }

    async isEmailAlreadyExist(email){
        let sql = `SELECT * FROM users WHERE email_address = "${email}";`
        let result = await db.query(sql)
        let returner = (result['0'].length > 0) ? true : false
        
        return returner

    }

}
module.exports = Post