require('dotenv').config()
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const user = require('./routes/student');
const auth = require('./routes/authorization');
const app = express();

//Setting up server middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//Routes (endpoints in separate files)
app.use('/student', user);
app.use('/auth', auth);

//Starting the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

//For mocha/chai testing
module.exports = app;