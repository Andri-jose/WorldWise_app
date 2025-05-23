import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
          <img 
            src={country.emoji} 
            alt={`${country.country} flag`} 
            style={{ width: '80px', height: 'auto' }} 
          />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
