const router = require('express').Router();
const {register, login} = require('../database_tools/auth_db');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

/**
 * Registers student. Supports urlencoded, multipart and json parameters.
 * Creates also JTW token (registered user is automatically logged)
 */
router.post('/register', upload.none(), async (req,res) => {
    const body =  req.body;
    try {
        let token = await register(body.fname, body.lname, body.username, body.pq);
        res.status(200).json({jwtToken: token});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/**
 * Login student and return JWT token as response. Token contains username.
 */
router.post('/login', upload.none(), async (req, res) => {
    const body = req.body;

    try {
        const result = await login(body.username, body.pw);
        res.status(result.code).json(result.content);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;