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

}
module.exports = Post