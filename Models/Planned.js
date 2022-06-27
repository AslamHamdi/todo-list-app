const db = require('../Config/db')

class Post {
    constructor(user){
        this.user = user
    }

    async getAllOverdueTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [8, null, null, null, this.user.id, null, null, null, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        return result
    }

    async getAllTomorrowTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [9, null, null, null, this.user.id, null, null, null, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        return result
    }

    async getAllThisWeekTasks(payload){
        let data = payload
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [10, null, null, null, this.user.id, null, null, null, data.startDate, data.endDate, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
        return result
    }

    async getAllPlannedTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [11, null, null, null, this.user.id, null, null, null, null, null, null], function(err, result){
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