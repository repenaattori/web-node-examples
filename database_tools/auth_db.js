const pgPool = require('./pg_connection');


const sql = {
    REGISTER: 'INSERT INTO student (fname, lname, username, pw) VALUES ($1,$2,$3,$4)',
    GET_PW: 'SELECT pw FROM student WHERE username=$1'
}

/**
 * Register new user
 */
async function register(fname,lname,uname,pwHash){
    await pgPool.query(sql.REGISTER,[fname,lname,uname,pwHash]);
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