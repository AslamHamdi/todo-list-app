const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Post = require('../Models/Auth')

function initialize(passport, getUserByEmail){
    passport.serializeUser((user, done) => done(null, user.id))
    // passport.deserializeUser((id, done) => {
    //     return done(null, getUserById(id))
    // })
    passport.deserializeUser(async function(id, done) {
        let data = new Post()
        data = await data.getUserById(id);
        //console.log("DATA DESE: ", data[0])
        return done(null, data[0])
    })

    passport.use(
        'local-login', 
        new LocalStrategy({
        usernameField: 'email'
        }, 
        async function (email, password, done) {
            let data = new Post()
            data = await data.loginLocal(email);
            const user = data.data['0'][0][0]
            console.log("EMAIL: ", email)
            console.log("PASS: ", password)
            if(!data.status){
                console.log("EMAIL DOES NOT EXIST")
                return done(null, false, { message: "User with that email does not exist. Please register" })
            }
            try {
                bcrypt.compare(String(password), String(user.password), function(err, result){
                    if(err){
                        console.log("ERROR compare: ", err)
                        return done(null, false, { message: "Password incorrect" })
                    }else{
                        console.log("RESULT COMPARE: ", result)
                        if(result){
                            return done(null, user)
                        }else{
                            return done(null, false, { message: "Password incorrect" })  
                        }                        
                    }
                })
            } catch (err) {
                console.log("ERROR: ", err)
                return done(err)
            }
        })
    );
}

module.exports = initialize