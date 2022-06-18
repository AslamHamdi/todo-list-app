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
        return result
    }

    async getAllTodayTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [1, null, null, null, 1, null, null, null, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
            //console.log("RESULT: " ,result)
        return result
    }

    async addNewTask(payload){
        let data = payload.data
        if(data.hasOwnProperty('isImportant')){
            data.isImportant = payload.data.isImportant
        }else{
            data.isImportant = null
        }
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [2, data.task, data.date, data.time, 1, null, data.isImportant, null, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        return result
    }

    async deleteTask(payload){
        let data = payload
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [3, null, null, null, 1, data, null, null, null, null, null], function(err, result){
                if(err){
                    console.log("err: ", err)
                }else{
                    console.log("result", result)
                }
            })
        return result
    }

    async addOrRemoveImportantTask(payload){
        let data = payload
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [4, null, null, null, 1, data.taskId, data.isImportant, null, null, null, null], function(err, result){
                if(err){
                    console.log("err: ", err)
                }else{
                    console.log("result", result)
                }
            })
        return result
    }

    async addOrRemoveCompletedTask(payload){
        let data = payload
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [5, null, null, null, 1, data.taskId, null, data.isCompleted, null, null, null], function(err, result){
                if(err){
                    console.log("err: ", err)
                }else{
                    console.log("result", result)
                }
            })
        return result
    }
}

module.exports = Post