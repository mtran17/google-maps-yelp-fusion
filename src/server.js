// server.js

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Define an endpoint for handling requests for Google Places API data
app.get('/google-places', async (req, res) => {
    const { keyword, location, radius, apiKey } = req.query;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${location}&radius=${radius}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
