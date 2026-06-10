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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price field is required'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port number ${port}...`);
});
