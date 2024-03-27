import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header'
import SearchAndMap from './components/SearchAndMap/SearchMap'
import './App.css'


const App = () => {
    const [clickedLatLng, setClickedLatLng] = useState(null);
    const [nRadius, setRadius] = useState(null);

    const handleLatLngChange = (latLng) => {
        console.log("New clickedLatLng:", latLng);
        setClickedLatLng(latLng);
    };

    const handleRadiusChange = (nRadius) => {
        console.log("radius (App.js): ", nRadius)
        setRadius(nRadius)
    }   
    
    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch("/api")
        .then(response => response.json())
        .then(data => {
            setBackendData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className='body'>
            <Header/>
            <SearchAndMap/>
            {backendData.length === 0 ? ( 
                <p>loading...</p>
            ) : (
                backendData.businesses.map((business, i) => {
                return (
                    <div key={i}>
                    <p>Name: {business.name}</p>
                    <p>Rating: {business.rating}</p>
                    <img src={business.image_url} alt={business.name} />
                    {/* Add more properties as needed */}
                    </div>
                );
                })
            )}
        </div> 
    )
}

export default App;