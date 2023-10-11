const pgPool = require('./pg_connection');

const sql = {
    GET_STUDENT: 'SELECT fname, lname FROM student WHERE username=$1'
}

/**
 * Gets basic student information.
 */
async function getStudentInfo(username){

    if(username){
        let result =  await pgPool.query(sql.GET_STUDENT,[username]);
        if(result.rowCount > 0){
            const student = result.rows[0];
            return {fname: student.fname, lname: student.lname};    
        }
    }
    
    return null;
}

module.exports = {getStudentInfo}