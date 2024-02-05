// require('dotenv').config();

import React, { useEffect, useState } from 'react';
import './Map.css'

const Map = () => {
  const [clickedLatLng, setClickedLatLng] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      // const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      // console.log(apiKey)
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCUnmqTkhklqvM0P2AjfHMVyx7bxBmMwio&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        initMap();
      };
    };


    const initMap = () => {
        const position = { lat: 33.88134, lng: -117.8818 };

        // ensure that we define a map
        if (window.google && window.google.maps && window.google.maps.Map) {
            const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: position,
            mapId: 'DEMO_MAP_ID',
            });

            /* not adjustable yet */
            const adjustableCircle = new window.google.maps.Circle({
                strokeColor: "#083D77",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#083D77",
                fillOpacity: 0.15,
                map,
                center: position,
                radius: 5000,
            });

            let infoWindow = new window.google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: position,
            });

            infoWindow.open(map);


            map.addListener('click', (ClickEvent) => {
                infoWindow.close();
                
                // creating an info window
                infoWindow = new window.google.maps.InfoWindow({
                    position: ClickEvent.latLng,
                    center: position,
                });

                map.panTo(ClickEvent.latLng)
                setClickedLatLng(ClickEvent.latLng);
                // console.log(ClickEvent.latLng)

                const currLatLng = JSON.stringify(ClickEvent.latLng.toJSON(), null, 2);
                console.log(clickedLatLng)

                infoWindow.setContent(currLatLng);
                adjustableCircle.setCenter(ClickEvent.latLng);

                infoWindow.open(map);

                console.log('Map clicked: ', currLatLng)
            });       

      } else {
        console.error('Error: google.maps.Map not defined');
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      loadGoogleMapsScript();
    }
  }, []); // empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <div id="map"></div>
        <div className="clicked-coordinates">
        {clickedLatLng && (
          <div>
            <p>Clicked Coordinates:</p>
            <p>Latitude: {clickedLatLng.lat()}</p>
            <p>Longitude: {clickedLatLng.lng()}</p>
          </div>
        )}
        </div>
    </div>
  );
};

export default Map;
