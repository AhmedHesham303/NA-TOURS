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
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);
  const updatedTour = { ...tour, ...req.body };
  const tourIndex = tours.findIndex((t) => t.id === parseInt(id));
  tours[tourIndex] = updatedTour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to update tour',
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    },
  );
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id;
  const tourIndex = tours.findIndex((t) => t.id === parseInt(id));

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found',
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to save tour',
        });
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour,
        },
      });
    },
  );
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`running on port number ${port}...`);
});
