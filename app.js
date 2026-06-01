const express = require('express');

const app = express();

const fs = require('node:fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);

const tours = JSON.parse(data);

app.use(express.json());

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('you can post');
});

const port = 3000;

app.listen(port, () => {
  console.log(`running on port number ${port}...`);
});
