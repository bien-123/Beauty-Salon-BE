const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const route = require('./routers/index');
const db = require('./config/db/index.js');
const port = process.env.PORT;

//CONNECT DATABASE
db.connect();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

// Router init
route(app);

app.get('/', function (req, res) {
    res.send('This is Server!');
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
