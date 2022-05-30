const express = require('express')
const path = require('path')


const app = express()
const port = process.env.BACKEND_PORT || 5000

app.use('/dist', express.static(__dirname + '../../dist/'))
app.use('/ClientApp', express.static(__dirname + '../../ClientApp/'))
app.use('/assets', express.static(__dirname + '../../ClientApp/src/assets/'))
app.use('/Views', express.static(__dirname + '../../Views/'))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../Views/Shared/layout.html'))
})

// app.get('/', function(req, res){
//     res.redirect('/dashboard')
// })

// app.get("/:name(dashboard)?", (req, res) => {
//     res.sendFile(path.join(__dirname, '../Views/Shared/layout.html'), {
//         tab: capitalizeFirstLetter(req.params.name)
//     })
// })

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.listen(port, () => console.log(`Server is live on ${port}`))
