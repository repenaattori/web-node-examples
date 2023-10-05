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

const pgclient = new Client({
    host: 'localhost',
    port: 5433,
    database:  'postgres',
    user: 'postgres',
    password: ''
});

/**
 * 
 */
app.get('/companies',async (req,res) =>{
    try {
        await pgclient.connect();
        let rows =  await pgclient.query('SELECT * FROM employee WHERE company_id<$1 AND id>$2', [2,1]);
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



