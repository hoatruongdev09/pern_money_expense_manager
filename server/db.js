const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'money_manager',
    port: '5432'
})

module.exports = pool