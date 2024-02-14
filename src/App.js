import React, {useState} from 'react';
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import Search from './components/Search/Search';
import './App.css'

// import Map from './components/MapOnClick/MapOnClick'

const App = () => {
    const [clickedLatLng, setClickedLatLng] = useState(null);

    const handleLatLngChange = (latLng) => {
        console.log("New clickedLatLng:", latLng);
        setClickedLatLng(latLng);
    };
    
    return (
        <div className='body'>
            <Header/>
            <Map initialPosition={{ lat: 33.88134, lng: -117.8818 }} onLatLngChange={handleLatLngChange} />
            <Search clickedLatLng={clickedLatLng}/>
        </div> 
    )
}

export default App;