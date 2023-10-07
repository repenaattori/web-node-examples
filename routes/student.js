const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {getStudent} = require('../database_tools/student_db')


//Student endpoints return all students without any id parameter

/**
 * Endpoint for using query parameter like localhost:300?username=repe
 */
router.get('/', async (req,res)=>{

    try{
        const result = await getStudent(req.query.username);
        res.status(result.code).json(result.content);
    }catch(error){
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
       res.status(401).json({error: err.message});
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