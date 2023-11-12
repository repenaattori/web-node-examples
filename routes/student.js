require('dotenv').config()
const router = require('express').Router();
const {getStudent, addNote} = require('../database_tools/student_db');
const {auth} = require('../auth/auth');


/**
 * Endpoint for getting student/students using query parameter like localhost:300?username=repe
 * Returns all students if no username defined
 */
router.get('/', async (req,res)=>{

    try{
        const students = await getStudent(req.query.username);
        if(students){
            res.status(200).json( students );
        }else{
            res.status(404).json({error: "Student not found"});
        }
      
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

/**
 * Endpoint for getting personal data for user. Token is checked in the auth middleware.
 */
router.get('/personal', auth, async (req,res)=>{
    try{
       const username = res.locals.username;
       res.status(200).json({username: username, personalData: "Some personal data"});
    }catch(err){
       res.status(505).json({error: err.message});
    }
});


/**
 * Adds new note for the student {username: xxx, message: xxx}
 */
router.post('/note', async (req,res)=>{
    try {
        const uname = await addNote(req.body.username, req.body.message);
        if(uname){
            res.status(200).send('Note added for user ' + uname);
        }else{
            res.status(404).send('User ' + req.body.username + ' not found!');    
        }
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});


module.exports = router;