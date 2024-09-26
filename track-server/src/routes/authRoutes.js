const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user }, 'MY_SECRET_KEY');

    res.send({ token });
  } catch (err) {
    return res.status(422).send(err);
  }
});

// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(422).send({ error: 'Must provide email and password' });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).send({ error: 'Email not found' });
//   }

//   try {
//     await user.comparePassword(password);
//     const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
//     res.send({ token });
//   } catch (err) {
//     return res.status(422).send({ error: 'Invalid password or email' });
//   }
// });

router.post('/signin', async (req, res) => {
  console.log('Received request to /signin');
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found');
    return res.status(404).send({ error: 'Email not found' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    console.log('Error comparing password or signing token', err);
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
