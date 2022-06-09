const db = require('../Config/db')

class Post {
    constructor(userId, firstName, lastName, userName, email, password){
        this.userId = userId
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.email = email
        this.password = password
    }

    static getAllUsers(){
        let sql = "SELECT * FROM users;"
        let result = db.execute(sql)
        //console.log("RESULT ALL USERS", result)
        return result
    }

    async getAllTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, @taskId, ?, ?); SELECT @taskId;"
        const result = await db.query(sql,
            [1, null, null, null, 1, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    //console.log("result: ", result)
                }
            });
            //console.log(result)
        return result
    }

    async addNewTask(payload){
        let data = payload.data
        let sql = "call sp_task(?, ?, ?, ?, ?, @taskId, ?, ?); SELECT @taskId;"
        const result = await db.query(sql,
            [2, data.task, data.date, data.time, 1, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        return result
    }
}

module.exports = Post