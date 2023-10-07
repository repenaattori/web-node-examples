require('dotenv').config();
const {Pool} = require('pg');

//Creating connection pool
const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_UNAME,
    password: process.env.PG_PW
});

//Connecting the pool and handling possible connection error
pgPool.connect((err) => {
    if(err){
        console.error(err.message);
    }
});

module.exports = pgPool;