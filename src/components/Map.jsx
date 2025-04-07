import React from 'react';
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Map = () => {
    const navigate = useNavigate();

    const [searchParams, setSeachParams] = useSearchParams();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <h1>Map Component</h1>
            <p>Position: {lat}, {lng}</p>
        </div>
    );
};

export default Map;