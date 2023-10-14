const { use } = require('chai');
const pgPool = require('./pg_connection');

const sql = {
    GET_STUDENT: 'SELECT fname, lname, username FROM student WHERE username=$1',
    GET_ALL_STUDENTS: 'SELECT fname, lname, username FROM student',
    ADD_NOTE: 'INSERT INTO note (msg, student_uname) VALUES ($1, $2)'
}

/**
 * Get one student by username or all users if username not defined.
 */
async function getStudent(username){

    if(username){
        let result =  await pgPool.query(sql.CHECK_STUDENT,[username]);
        return result.rowCount > 0 ? 
            {code: 202, content: result.rows[0]} 
            : {code: 404, content: {error: 'Student not found by username'}} ;
    }
    
    let result =  await pgPool.query(sql.GET_ALL_STUDENTS);
    return {code: 202, content: result.rows}
}

/**
 * Adds note for the user
 */
async function addNote(username, message){

    const result = await pgPool.query(sql.GET_STUDENT, [username]);

    if(result.rowCount > 0 ){
        await pgPool.query(sql.ADD_NOTE, [message, username]);
        return username;
    }

    return null;
   
}

module.exports = {getStudent, addNote}