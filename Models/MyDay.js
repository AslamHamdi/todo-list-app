const db = require('../Config/db')

class Post {
    constructor(user){
        this.user = user
    }

    async getAllTodayTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [1, null, null, null, this.user.id, null, null, null, null, null, null], function(err, result){
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
        data.isImportant = (data.hasOwnProperty('isImportant')) ? payload.data.isImportant : null
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [2, data.task, data.date, data.time, this.user.id, null, data.isImportant, null, null, null, null], function(err, result){
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
            [3, null, null, null, this.user.id, data, null, null, null, null, null], function(err, result){
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
            [4, null, null, null, this.user.id, data.taskId, data.isImportant, null, null, null, null], function(err, result){
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
            [5, null, null, null, this.user.id, data.taskId, null, data.isCompleted, null, null, null], function(err, result){
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