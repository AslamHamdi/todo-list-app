require('dotenv').config({path: __dirname + '../../.env'})
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use('/dist', express.static(__dirname + '../../dist/'))
app.use('/ClientApp', express.static(__dirname + '../../ClientApp/'))
app.use('/assets', express.static(__dirname + '../../ClientApp/src/assets/'))
app.use('/Views', express.static(__dirname + '../../Views/'))
app.use('/Config', express.static(__dirname + '../../Config/'))

app.use(express.json())

//Default route to layout html
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../Views/Shared/layout.html'))
})

app.use('/api', require('./ApiRouter'))

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.listen(port, () => console.log(`Server is live on ${port}`))


