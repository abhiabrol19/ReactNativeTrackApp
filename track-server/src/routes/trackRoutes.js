const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
  } catch (error) {
    console.error('Error fetching tracks', error);
    res.status(422).send('Issue fetching tracks');
  }
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (
    !name ||
    !locations ||
    !Array.isArray(locations) ||
    locations.length < 2
  ) {
    return res
      .status(422)
      .send({ error: 'Must provide a name and at least two location points.' });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (error) {
    console.error('Error saving track:', error.message);
    res.status(500).send('Failed to save track. Please try again.');
  }
});

router.delete('/tracks/:id', requireAuth, async (req, res) => {
  try {
    const track = await Track.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!track) return res.status(404).send({ error: 'Track not found' });
    res.send({ message: 'Track deleted successfully' });
  } catch (error) {
    console.error('Error deleting track', error);
    res.status(500).send('Issue deleting track');
  }
});

module.exports = router;
