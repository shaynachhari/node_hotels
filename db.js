const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://localhost:27017/hotels';
// const mongoURL = 'mongodb+srv://shaynachhari:N8V9vxlmUKdkvUKA@cluster0.6vliwwy.mongodb.net/'
// const mongoURL =process.env.MONGOdB_URL;
const mongoURL = process.env.MONGOdB_URL_lOCAL  // add

mongoose.connect(mongoURL, {
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000, 
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Connection error:', err);
});
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
