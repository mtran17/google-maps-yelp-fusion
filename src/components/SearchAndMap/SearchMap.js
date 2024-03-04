import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import './SearchMap.css';

const SearchAndMap = () => {
    const options = [
        'bar', 
        'bank', 
        'gym', 
        'restaurant', 
        'shopping_mall', 
        'liquor_store', 
        'cafe', 
        'church',
        'dentist',
        'pharmacy',
        'night_club'
    ];

    const prices = [
        0,
        1,
        2,
        3,
        4,
    ]   

    const getOptionLabel = (option) => {
        // Convert snake_case to Title Case
        return option.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const getPriceLabel = (price) => {
        switch (price) {
            case 0:
                return 'Free';
            case 1:
                return '$';
            case 2:
                return '$$';
            case 3:
                return '$$$';
            case 4:
                return '$$$$';
            default:
                return '';
        }
    };
    

    const [optionVal, setOptionVal] = useState(options[0]);
    const [priceVal, setOptionPrice] = useState(prices[0]);


    const [inputValue, setInputValue] = useState('');
    const [inputPrice, setInputPrice] = useState('');
      
    const [nRadius, setRadius] = useState(9600); // Default radius in meters
    const [clickedLatLng, setClickedLatLng] = useState({ lat: 33.88134, lng: -117.8818 });
    const mapRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCUnmqTkhklqvM0P2AjfHMVyx7bxBmMwio&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                initMap();
            };

            document.head.appendChild(script);
        };

        const initMap = () => {
            if (window.google && window.google.maps && window.google.maps.Map) {
                const fullerton = { lat: 33.8831307524001, lng: -117.88541077620087 };
                const map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: 11,
                    center: fullerton,
                });

                mapRef.current = map;

                const initCircle = new window.google.maps.Circle({
                    strokeColor: "#083D77",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#083D77",
                    fillOpacity: 0.15,
                    map,
                    center: fullerton,
                    radius: nRadius, 
                });

                circleRef.current = initCircle;

                let infoWindow = new window.google.maps.InfoWindow({
                    content: "Fullerton",
                    position: fullerton,
                });

                infoWindow.open(map);

                setClickedLatLng(fullerton);

                map.addListener('click', (clickEvent) => {
                    infoWindow.close();
                    clearMarkers();

                    const lat = clickEvent.latLng.lat();
                    const lng = clickEvent.latLng.lng();
                    const clickedLatLng = { lat, lng };

                    infoWindow = new window.google.maps.InfoWindow({
                        position: clickedLatLng,
                        center: clickedLatLng,
                    });

                    console.log(clickEvent)
                    map.panTo(clickEvent.latLng);
                    setClickedLatLng(clickedLatLng);

                    const currLatLng = JSON.stringify(clickEvent.latLng.toJSON(), null, 2);
                    infoWindow.setContent(currLatLng);

                    initCircle.setCenter(clickEvent.latLng);

                    infoWindow.open(map);
                });
            } else {
                console.error('Error: google.maps.Map not defined');
            }
        };

        if (!window.google || !window.google.maps || !window.google.maps.Map) {
            loadGoogleMapsScript();
        } else {
            initMap();
        }

    }, []); 

    const handleRadiusChange = (event, value) => {
        setRadius(value); 
        circleRef.current.setRadius(value); 
    };

    let markers = [];

    function clearMarkers() {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = []; 
    }

    const handleSearch = async () => {
        // Clear the existing search results and markers
        const placesList = document.getElementById("places");
        placesList.innerHTML = '';
        clearMarkers();
    
        console.log("Searching for:", optionVal, "near lat:", clickedLatLng.lat, "lng:", clickedLatLng.lng, "within a", nRadius, "m radius." );
        console.log("Price: ", priceVal);
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        let getNextPage;
        const moreButton = document.getElementById("more");
    
        moreButton.onclick = function () {
            moreButton.disabled = true;
            if (getNextPage) {
                getNextPage();
            }
        };
    
        service.nearbySearch(
            {   location: clickedLatLng, 
                radius: nRadius, 
                type: optionVal, 
                price_level: priceVal,
            },
            (results, status, pagination) => {
                if (status !== "OK" || !results) return;
                console.log(results)
                const filteredResults = results.filter(place => {
                    // Check if the first type matches optionVal
                    return place.types[0] === optionVal;
                });

                addPlaces(filteredResults, mapRef.current);
                moreButton.disabled = !pagination || !pagination.hasNextPage;
                if (pagination && pagination.hasNextPage) {
                    getNextPage = () => {
                        // Note: nextPage will call the same handler function as the initial call
                        pagination.nextPage();
                    };
                }
            }
        );
    
        function addPlaces(places, map) {
            for (const place of places) {
                if (place.geometry && place.geometry.location) {
                    const image = {
                        url: place.icon,
                        size: new window.google.maps.Size(71, 71),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(17, 34),
                        scaledSize: new window.google.maps.Size(25, 25),
                    };
    
                    const marker = new window.google.maps.Marker({
                        map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location,
                    });
    
                    markers.push(marker); // Store the marker in the array
    
                    const li = document.createElement("li");
    
                    li.textContent = place.name;
                    placesList.appendChild(li);
                    li.addEventListener("click", () => {
                        map.panTo(place.geometry.location);
                        window.google.maps.event.addListenerOnce(map, 'idle', () => {
                            map.setZoom(13);
                        });
                    });
                }
            }
        }
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
                    id="controllable-states-demo-options"
                    options={options}
                    getOptionLabel={(option) => getOptionLabel(option)}
                    renderInput={(params) => <TextField {...params} label="Search Options" />}
                    sx={{ width: '25vw', height: '10vh' }}
                    autoComplete={true} // Enable autocomplete
                    autoHighlight={true} // Highlight first option by default
                    clearOnEscape={true} // Clear input on pressing escape key
                />
                <Autocomplete
                    value={priceVal}
                    onChange={(event, newPrice) => {
                        setOptionPrice(newPrice);
                    }}
                    inputValue={inputPrice}
                    onInputChange={(event, newInputPrice)=>{
                        setInputPrice(newInputPrice)
                    }}
                    id="controllable-states-demo-prices"
                    options={prices}
                    getOptionLabel={(option) => getPriceLabel(option)}
                    renderInput={(params) => <TextField {...params} label="Pricing" />}
                    sx={{ width: '8vw', height: '5vh' }}
                    autoComplete={true} // Enable autocomplete
                    autoHighlight={true} // Highlight first option by default
                    clearOnEscape={true} // Clear input on pressing escape key
                />
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </div>
            <div className='slider-container'>
                <Slider
                    min={1600}    // minimum radius value in meters
                    max={40000}   // maximum radius value in meters
                    step={1600}   // step size for the slider
                    onChange={handleRadiusChange}
                    value={nRadius} // Slider value in meters
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `${value / 1600} ${value === 1600 ? 'mile' : 'miles'}`}
                    aria-labelledby="radius-slider"
                />
            </div>
            <div id="map"></div>
            <div id="sidebar">
                <h2>Results</h2>
                <ul id="places"></ul>
                <button id="more">Load more results</button>
            </div>
            <div className="clicked-coordinates">
                {clickedLatLng && (
                    <div className='coordinate-text'>
                        <p>Clicked Coordinates:</p>
                        <p>Latitude: {clickedLatLng.lat}</p>
                        <p>Longitude: {clickedLatLng.lng}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchAndMap;
