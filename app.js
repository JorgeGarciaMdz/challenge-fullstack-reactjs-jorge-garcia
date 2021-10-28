const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(logger('dev'));
app.use(cors());
app.options('*/*',cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1/user', require('./routes/user.routes'));
app.use('/api/v1/operation', require('./routes/operation.routes'));

app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
});

