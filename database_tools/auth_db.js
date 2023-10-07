const jwt = require('jsonwebtoken');
const pgPool = require('./pg_connection');
const bcrypt = require('bcrypt');

async function register(fname,lname,uname,pw){
    const pwHash = await bcrypt.hash(pw, 10);
    await pgPool.query('INSERT INTO student (fname, lname, username, pw) VALUES ($1,$2,$3,$4)',[fname,lname,uname,pwHash]);
    const token = jwt.sign({username: uname}, process.env.JWT_SECRET_KEY);
    return token;
}

async function login(uname, pw){

    const result = await pgPool.query('SELECT pw FROM student WHERE username=$1', [uname]);
    
    if(result.rows.length > 0){
        const isAuth = await bcrypt.compare(pw, result.rows[0].pw);
        if(isAuth){
            const token = jwt.sign({username: uname}, process.env.JWT_SECRET_KEY);
            return {code: 202, content:{jwtToken: token}};
        }else{
            return {code: 401, content:{msg: 'User not authorized'}};
        }
    }else{
        return {code: 404, content:{msg: 'User not found'}};
    }
}


module.exports = {register, login};