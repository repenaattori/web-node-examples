const router = require('express').Router();
const {register, getPw} = require('../database_tools/auth_db');
const {register, getPw} = require('../database_tools/auth_db');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Registers student. Supports urlencoded, multipart and json parameters.
 * Creates also JTW token (registered user is automatically logged)
 */
router.post('/register', upload.none(), async (req,res) => {
    const body =  req.body;
    try {
        await register(body.fname, body.lname, body.username, body.pq);
        const token = jwt.sign({username: body.username}, process.env.JWT_SECRET_KEY);
        res.status(200).json({jwtToken: token});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/**
 * Login student and return JWT token as response. Token contains username.
 */
router.post('/login', upload.none(), async (req, res) => {

    const uname = req.body.username;
    const pw = req.body.pw;

    try {
        const db_pw = await getPw(uname);

        if(db_pw){
            const isAuth = await bcrypt.compare(pw, db_pw);
            if(isAuth){
                const token = jwt.sign({username: uname}, process.env.JWT_SECRET_KEY);
                res.status(200).json({jwtToken: token});
            }else{
                res.status(401).end('User not authorized');
            }
        }else{
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});


module.exports = router;