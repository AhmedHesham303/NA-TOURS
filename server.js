const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });

const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port number ${port}...`);
});
