import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Search.css';

const Search = ({ clickedLatLng, nRadius}) => {
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
    const [optionVal, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    if (nRadius === null) {
        nRadius = 10000;
    }

    const handleSearch = async () => {
        console.log("Searching for : " , optionVal, " near ", "lat: ", clickedLatLng.lat, clickedLatLng.lng, " within a ", nRadius, "m radius." )

        // const apiKey = 'AIzaSyCUnmqTkhklqvM0P2AjfHMVyx7bxBmMwio'; // Replace 'YOUR_API_KEY' with your actual API key
    };

    return (
        <div className='search-container'>
            <Autocomplete
                value={optionVal}
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
