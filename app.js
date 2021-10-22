const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1/user', require('./routes/user.routes'));

app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
});

