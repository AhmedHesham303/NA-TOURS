const express = require('express');

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users: [],
    },
  });
};

const getUser = (req, res) => {
  const id = req.params.id * 1;
  res.status(200).json({
    status: 'success',
    data: {
      user: `User with id ${id} found`,
    },
  });
};

const createUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      user: req.body,
    },
  });
};

const updateUser = (req, res) => {
  const id = req.params.id * 1;
  res.status(200).json({
    status: 'success',
    data: {
      user: `User with id ${id} updated`,
    },
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id * 1;
  res.status(204).json({
    status: 'success',
    data: {
      user: `User with id ${id} deleted`,
    },
  });
};
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
