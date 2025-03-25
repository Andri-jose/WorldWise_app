import React from 'react';
import styles from './CityItem.module.css'

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  


const CityItem = ({city}) => {

    const {cityName, emoji, date} = city;
    console.log(city);
    return (
        <div className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.cityName}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </div>
    );
};

export default CityItem;