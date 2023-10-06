require('dotenv').config()
const {Client} = require('pg')
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

//Creating pg client wit connection info
const pgclient = new Client({
    host: 'localhost',
    port: 5433,
    database:  'postgres',
    user: 'postgres',
    password: ''
});

/**
 * Endpoint for getting list of companies
 */
app.get('/companies', async (req,res) =>{
    try {
        await pgclient.connect();
        let result =  await pgclient.query('SELECT * FROM company');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
    }
});

/**
 * Endpoint for adding new companies using form data.
 */
app.post('/companies', async(req,res) =>{
    try {
        await pgclient.connect();
        
        let command = 'INSERT INTO company (name) VALUES ';

        
        for (let i = 1; i <= req.body.length; i++) {
            if(i!=1)
                command += ',';

            command += '($' + i + ')'; 
        }

        await pgclient.query(command, req.body);
        res.status(200).send("Companies added!");
    
    } catch (err) {
        console.error(err);
    }
});



async function connect(){
    try {
        await pgclient.connect();
        console.log('Valmista');
        let tulos =  await pgclient.query('SELECT * FROM employee WHERE company_id<$1 AND id>$2', [2,1]);
        console.log(tulos.rows);
    } catch (err) {
        console.error(err);
    }
}



