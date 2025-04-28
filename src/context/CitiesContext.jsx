import { createContext, useState, useEffect } from 'react';

const CitiesContext = createContext();

const Base_URL = 'http://localhost:9000';

function CitiesProvider({ children }) {   
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <CitiesContext.Provider value={{ cities, loading }}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider };