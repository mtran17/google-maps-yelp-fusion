import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); // Load environment variables
const app = express();

app.get('/maps/api/js', (req, res) => {
  const { key, libraries, callback } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // Validate API key
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Maps API key not provided' });
  }

  // Validate other parameters if necessary

  // Redirect to the Google Maps API endpoint with the provided key
  const redirectUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}&callback=${callback}`;
  res.redirect(redirectUrl);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
