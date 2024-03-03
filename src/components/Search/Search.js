import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider'; // Import Slider from Material-UI
import './Search.css';

const Search = ({ clickedLatLng, defaultRadius, onRadiusChange }) => {
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

    const [optionVal, setOptionVal] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [nRadius, setRadius] = useState(defaultRadius || 9600); // Set defaultRadius if provided, otherwise default to 10000

    const handleRadiusChange = (event, nRadius) => {
        setRadius(nRadius * 1600); // Convert meters to miles
        onRadiusChange(nRadius * 1600); // Call onRadiusChange with the updated radius
    };

    const handleSearch = async () => {
        console.log("Searching for:", optionVal, "near lat:", clickedLatLng.lat, "lng:", clickedLatLng.lng, "within a", nRadius, "m radius.");
    };

    return (
        <div>
            <div className='search-container'>
                <Autocomplete
                    value={optionVal}
                    onChange={(event, newValue) => {
                        setOptionVal(newValue);
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
            <div className='slider'>
                <Slider
                    min={1}    // minimum radius value in miles
                    max={25}   // maximum radius value in miles
                    step={1}   // step size for the slider
                    onChange={handleRadiusChange}
                    value={nRadius / 1600} // Convert meters to miles for Slider value
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `${value} ${value === 1 ? 'mile' : 'miles'}`}
                    aria-labelledby="radius-slider"
                />
            </div>
        </div>
    );
};

export default Search;
