import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import './Search.css'

const theme = createTheme({
    palette: {
      salmon: {
        sub: '#E18C85',
        main: '#B3564E'
      },
    },
});

/*
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
*/

const Search = ({ clickedLatLng }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (clickedLatLng) {
            console.log("Searching for:", searchValue, "near coordinates:", clickedLatLng.lat, clickedLatLng.lng);
        } else {
            console.log("No coordinates available");
        }
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer QRy3peTwKHhnlMYWXQNdvfhdDXDAWmQ68YnIH2MewwmMte30eelvDw34s2OR03QCZQ5HuPS0QdtEjHcZAazrR5DFePKeaG3hvaOakvnR9waOP0jgQgEoQ3B8WCi4ZXYx'
        }
    };
    
    fetch('https://api.yelp.com/v3/businesses/search?latitude=33.93734&longitude=-117.9904&term=food&sort_by=best_match&limit=20', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


    return (
        <div className='search-box'>
            <TextField
                label="Search for food, things to do, etc."
                variant="outlined"
                sx={{ 
                    width: '20vw',
                    height: '6vh',
                }} 
                value={searchValue}
                onChange={handleChange}
            />

            <ThemeProvider theme={theme}>
                <Button variant="contained" sx={{
                    bgcolor: 'salmon.main', 
                    '&:hover': {
                        bgcolor: 'salmon.sub',
                    },
                    width: '8vw',
                    height: '6vh',
                    }}
                    onClick={handleSearch}
                    >
                    Search
                </Button>
            </ThemeProvider>


        </div>
    ) 
}

export default Search;

/*
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer QRy3peTwKHhnlMYWXQNdvfhdDXDAWmQ68YnIH2MewwmMte30eelvDw34s2OR03QCZQ5HuPS0QdtEjHcZAazrR5DFePKeaG3hvaOakvnR9waOP0jgQgEoQ3B8WCi4ZXYx'
  }
};

fetch('https://api.yelp.com/v3/businesses/search?latitude=33.90579&longitude=-117.77125&term=food&radius=10000&sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
*/