import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';

const CitiesContext = createContext();

const Base_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {   
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch(`${Base_URL}/cities`)
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setLoading(false);
            }) 
            .catch( (error) => {
                alert('Error fetching data', error);
                setLoading(false);
            });
    }, []);

    function getCity(id) {
        setLoading(true);
        fetch(`${Base_URL}/cities/${id}`)
            .then(response => response.json())
            .then(data => {
                setCurrentCity(data);
                setLoading(false);
            }) 
            .catch( (error) => {
                alert('Error fetching data by ID', error);
                setLoading(false);
            });
    }

   async function createCity(newCity) {
      try{  setLoading(true);
        const res = await fetch(`${Base_URL}/cities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCity),
        });
        const data = await res.json();
        setCities((prevCities) => [...prevCities, data]);
        }
        catch { 
            alert('There was an error loading data');
        } finally {
            setLoading(false);
        }
            
    };

    return (
        <CitiesContext.Provider value={{ cities, loading, currentCity, getCity, createCity}}>
            {children}
        </CitiesContext.Provider>
    );
};

function useCities() {
    const context = useContext(CitiesContext);
    if (!context) {
        throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
}

export { CitiesProvider, useCities };