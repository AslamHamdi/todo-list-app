const express = require('express')
const router = express.Router()
const AuthRouter = require('./auth/AuthRouter')

router
    .route("/RegisterUser")
    .get(AuthRouter.registerUser)
    .post(AuthRouter.registerUser)

// router
//     .route("/LoginLocal")
//     .get(AuthRouter.loginLocal)
//     .post(AuthRouter.loginLocal)

module.exports = router