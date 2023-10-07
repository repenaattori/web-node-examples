const pgPool = require('./pg_connection');


async function getStudent(username){

    if(username){
        let result =  await pgPool.query('SELECT fname, lname FROM student WHERE username=$1',[username]);
        return result.rows[0] ? 
            {code: 202, content: result.rows[0]} 
            : {code: 404, content: {error: 'Student not found by username'}} ;
    }
    
    let result =  await pgPool.query('SELECT fname, lname FROM student');
    return {code: 202, content: result.rows}
}

module.exports = {getStudent}