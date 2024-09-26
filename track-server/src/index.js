require('./models/User');
require('./models/Track');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  try {
    res.send(`Your email: ${req.user.email}`);
  } catch (error) {
    console.error('Error sending response', error);
    res.status(422).send('Issue sending response');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
