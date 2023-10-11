const jwt = require('jsonwebtoken');
const pgPool = require('./pg_connection');

const sql = {
    GET_PW: 'SELECT pw FROM student WHERE username=$1',
    INSERT_STUDENT: 'INSERT INTO student (fname, lname, username, pw) VALUES ($1,$2,$3,$4)'
}

/**
 * Registers new user
 */
async function register(fname,lname,username, pw){
    return await pgPool.query(sql.INSERT_STUDENT, [fname,lname,username,pw]);
}

/**
 * Gets database password hash by username
 */
async function getPw(username){
    const result = await pgPool.query(sql.GET_PW, [username]);

    if(result.rows.length>0){
       return result.rows[0].pw;
    }else{
       return null;
    }
}

module.exports = {register, getPw};