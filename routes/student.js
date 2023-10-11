const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {getStudentInfo} = require('../database_tools/student_db')
const  {auth} = require('../auth/auth');

//Student endpoints return all students without any id parameter

/**
 * Endpoint for testing if the token is valid (e.g. getting private data for user)
 * Auth middleware checks the token and calls this if the user is authorized.
 */
router.get('/private', auth, async (req,res)=>{

    try{
        const student = getStudentInfo(res.locals.username);
        if(!student){
            res.status(404).json({error: 'User not found!'});
        }
        res.status(200).json(userdata);
    }catch(err){
       res.status(505).json({error: err.message});
    }
});


// /**
//  * Endpoint for using query parameter like localhost:300?username=repe
//  */
// router.get('/',async (req,res)=>{

//     try{
//         const result = await getStudent(req.query.username);
//         res.status(result.code).json(result.content);
//     }catch(error){
//         res.status(500).json(error);
//     }
// });


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