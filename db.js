const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/hotels';

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000, 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
