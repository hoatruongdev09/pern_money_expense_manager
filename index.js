const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()


const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/auth', require('./routes/auth'))
app.use('/category', require('./routes/category'))
app.use('/money_expense', require('./routes/money'))
app.use('/user', require('./routes/user'))

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(port, () => {
    console.log('app listen on port: ', port)
})