require('dotenv').config()
const {Pool} = require('pg')
require('dotenv').config()

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: "uploads/" });

var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

//Creating connection pool
const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_UNAME,
    password: process.env.PG_PW
});

//Connecting the pool and handling possible connection error
pgPool.connect((err) => {
    if(err){
        console.error(err.message);
    }
})

/**
 * Endpoint for getting list of students
 */
app.get('/students', async (req,res) =>{
    try {
        let result =  await pgPool.query('SELECT (fname, lname) FROM student');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
    }
});

/**
 * Registers user. Supports urlencoded and multipart
 */
app.post('/register', upload.none(), async (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const uname = req.body.username;
    const pw = req.body.pw;

    try {
        const pwHash = await bcrypt.hash(pw, 10);

        await pgPool.query('INSERT INTO student (fname, lname, username, pw) VALUES ($1,$2,$3,$4)',[fname,lname,uname,pwHash]);

        const token = jwt.sign({username: uname}, process.env.JWT_SECRET_KEY);
        res.status(200).json({jwtToken: token});
        

    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.post('/login', upload.none(), async (req, res) => {
    const uname = req.body.username;
    const pw = req.body.pw;

    try {

        const result = await pgPool.query('SELECT pw FROM student WHERE username=$1', [uname]);
        
        if(result.rows.length > 0){
            const isAuth = await bcrypt.compare(pw, result.rows[0].pw);
            if(isAuth){
                const token = jwt.sign({username: uname}, process.env.JWT_SECRET_KEY);
                res.status(200).json({jwtToken: token});
            }else{
                res.status(401).end('User not authorized');
            }
        }else{
            res.status(404).send('User not found');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});




