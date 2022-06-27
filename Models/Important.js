const db = require('../Config/db')

class Post{
    constructor(user){
        this.user = user
    }

    async getAllImportantTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [6, null, null, null, this.user.id, null, null, null, null, null, null], function(err, result){
                if(err){
                    console.log("err:", err)
                }else{
                    console.log("result: ", result)
                }
            });
            //console.log(result)
        return result
    }
}

module.exports = Post