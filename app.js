require('dotenv').config()
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const user = require('./routes/student');
const auth = require('./routes/authorization');
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/student', user);
app.use('/auth', auth);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

//For mocha/chai testing
module.exports = app;