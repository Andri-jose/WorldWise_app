import { createContext, useState, useEffect, useContext } from 'react';

const CitiesContext = createContext();

const Base_URL = 'http://localhost:9000';

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

    function getCityById(id) {
        setLoading(true);
        fetch(`${Base_URL}/cities/${id}`)
            .then(response => response.json())
            .then(data => {
                setCurrentCity(data);
                setLoading(false);
            })
            .catch( (error) => {
                alert('Error fetching data', error);
                setLoading(false);
            });
    }

    return (
        <CitiesContext.Provider value={{ cities, loading, currentCity, getCityById }}>
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