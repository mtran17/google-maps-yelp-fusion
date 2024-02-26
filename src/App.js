import React, {useState} from 'react';
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import Search from './components/Search/Search';
import './App.css'

// import Map from './components/MapOnClick/MapOnClick'

const App = () => {
    const [clickedLatLng, setClickedLatLng] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [nRadius, setRadius] = useState(null);

    const handleLatLngChange = (latLng) => {
        console.log("New clickedLatLng:", latLng);
        setClickedLatLng(latLng);
    };

    const handleRadiusChange = (radius) => {
        console.log("radius (App.js): ", radius)
        setRadius(radius)
    }   

    
    return (
        <div className='body'>
            <Header/>
            <Search clickedLatLng={clickedLatLng} radius={nRadius}/>
            <Map initialPosition={{ lat: 33.88134, lng: -117.8818 }} 
                onLatLngChange={handleLatLngChange}
                onRadiusChange={handleRadiusChange}
            />
            {/* <SearchResults/> */}
        </div> 
    )
}

export default App;