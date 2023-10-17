require('dotenv').config()
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {getStudent, addNote} = require('../database_tools/student_db')
const {auth} = require('../auth/auth')


//Student endpoints return all students without any id parameter

/**
 * Endpoint for getting student/students using query parameter like localhost:300?username=repe
 */
router.get('/private', auth, async (req,res)=>{

    try{
        const result = await getStudent(req.query.username);
        res.status(result.code).json(result.content);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

/**
 * Endpoint for testing if the token is valid (e.g. getting personal data for user)
 */
router.get('/personal', async (req,res)=>{

    try{
       //Get the bearer token from authorization header
       const token = req.headers.authorization.split(' ')[1];
       //Verify the token. Verified token contains username
       const username = jwt.verify(token, process.env.JWT_SECRET_KEY).username;
       res.status(200).send('Token is valid for user ' + username);
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


/**
 * Endpoint for using path parameter like localhost:3001/repe
 */
// router.get('/student/:username', async (req,res)=>{
//     try{
//         const result = await getStudent(req.params.username);
//         res.status(result.code).json(result.content);
//     }catch(error){
//         res.status(500).json(error);
//     }

// });

module.exports = router;