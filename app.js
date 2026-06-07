const express = require('express');
const app = express();
const fs = require('node:fs');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());

const baseUrl = '/api/v1/tours';

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`running on port number ${port}...`);
});
