import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Search.css';

const Search = ({ clickedLatLng, radius }) => {
    const options = [
        'bar', 
        'bank', 
        'gym', 
        'restaurant', 
        'shopping_mall', 
        'liquor_store', 
        'cafe', 
        'church'
    ];
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    if (radius === null) {
        radius = 10000;
    }

    const handleSearch = async () => {
        console.log("Searching for : " , value, " near ", "lat: ", clickedLatLng.lat, clickedLatLng.lng, " within a ", radius, "m radius." )

        const apiKey = 'AIzaSyCUnmqTkhklqvM0P2AjfHMVyx7bxBmMwio'; // Replace 'YOUR_API_KEY' with your actual API key
        const url = `http://localhost:3000/google-places?keyword=${value || inputValue}&location=${clickedLatLng.lat},${clickedLatLng.lng}&apiKey=${apiKey}`;
        console.log(url)

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
            }
            const data = await response.json();
            console.log('Search Results:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Log the error object to inspect its structure
            console.log('Error object:', error);
        }
    };

    return (
        <div className='search-container'>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Controllable" />}
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default Search;
