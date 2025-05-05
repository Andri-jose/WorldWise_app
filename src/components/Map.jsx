// import React, { useState } from 'react';
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCities } from '../context/CitiesContext';

const Map = () => {
    const navigate = useNavigate();
    const {cities} = useCities();

    // const [position, setPosition] = useState([51.505, -0.09]); // Default position for the map

    const [searchParams, setSeachParams] = useSearchParams();

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <MapContainer center={[mapLat, mapLng]} zoom={13} scrollWheelZoom={true} className={styles.map}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
              {cities.map((city ) => (<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                  <span>{city.emoji}</span> <span>{city.cityName}</span> 
                </Popup>
              </Marker>
            ))}
            </MapContainer>
        </div>
    );
};

export default Map;