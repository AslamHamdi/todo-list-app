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

    async getAllTasks(){
        let sql = "call sp_task(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @taskId2); SELECT @taskId2;"
        const result = await db.query(sql,
            [7, null, null, null, 1, null, null, null, null, null, null], function(err, result){
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