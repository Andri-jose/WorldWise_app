import React from 'react';
import styles from './CityList.module.css'
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../context/CitiesContext';

function CityList() {
    const {cities, loading} = useCities();
    
    if(loading) return <Spinner />;

    if(!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

    return (
        <ul className={styles.cityList}> 
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </ul>
    );
};

export default CityList;