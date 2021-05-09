const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.use('/auth', require('./routes/auth'))
app.use('/category', require('./routes/category'))
app.use('/money_expense', require('./routes/money'))

app.listen(port, () => {
    console.log('app listen on port: ', port)
})