const express = require('express')
const router = express.Router()
const AuthRouter = require('./auth/AuthRouter')

router
    .route("/RegisterUser")
    .get(AuthRouter.registerUser)
    .post(AuthRouter.registerUser)

module.exports = router