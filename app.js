const express = require('express');

const app = express();

const fs = require('node:fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);

const tours = JSON.parse(data);

app.use(express.json());
const baseUrl = '/api/v1/tours';
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
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
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);
  const updatedTour = { ...tour, ...req.body };
  const tourIndex = tours.findIndex((t) => t.id === id);
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
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((t) => t.id === id);

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

      res.status(204).json({
        status: 'success',
        data: {
          tour: null,
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
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to save tour',
        });
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    },
  );
};
app.route(`${baseUrl}`).get(getAllTours).post(createTour);
app.route(`${baseUrl}/:id`).get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`running on port number ${port}...`);
});
