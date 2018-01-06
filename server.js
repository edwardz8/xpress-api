const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('errorHandler');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const app = express();

const apiRouter = require('./api/api');

app.use('/api', apiRouter);

const PORT = process.env.PORT || 8081;





module.export = app;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
