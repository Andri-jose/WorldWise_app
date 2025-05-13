import { createContext, useEffect, useReducer } from 'react';
import { useContext } from 'react';

const CitiesContext = createContext();

const Base_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    loading: false,
    currentCity: {},
    error: "",
}

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: true,
            };


        case "city/loaded":
            return {
                ...state,
                loading: false,
                cities: action.payload,
            };
        
        case "get/city":
            return {
                ...state,
                loading: false,
                currentCity: action.payload,
            };

        case "city/created":
            return {
                ...state,
                loading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };    

        case "city/deleted":
            return {
                ...state,
                loading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {},
            };

        case "rejected":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default: throw new Error(`Unknown action type: ${action.type}`);
    };

};
        

function CitiesProvider({ children }) {   
    const [{cities, loading, currentCity, error}, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        dispatch({ type: "loading" });
        fetch(`${Base_URL}/cities`)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: "city/loaded", payload: data });
            }) 
            .catch( (error) => {
                dispatch({ type: "rejected", payload: "There was an error loading data...", error });
            });
    }, []);

    function getCity(id) {
        if(Number(id) === currentCity.id) return;

        dispatch({ type: "loading" });
        fetch(`${Base_URL}/cities/${id}`)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: "get/city", payload: data });
            }) 
            .catch( (error) => {
                dispatch({ type: "rejected", payload: "There was an error fetching data by ID", error });
            });
    }

   async function createCity(newCity) {
      try{  
        dispatch({ type: "loading" });
        const res = await fetch(`${Base_URL}/cities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCity),
        });
        const data = await res.json();
        dispatch({ type: "city/created", payload: data });
        }
        catch { 
            dispatch({ type: "rejected", payload: "There was an error creating city." });
        } 
            
    };


    async function deleteCity(id) {
      try{  
        dispatch({ type: "loading" });
        await fetch(`${Base_URL}/cities/${id}`, {
            method: 'DELETE',   
        });
   
        dispatch({ type: "city/deleted", payload: id });
        }
        catch { 
            dispatch({ type: "rejected", payload: "There was an error deleting city." });
        }  
    };

    return (
        <CitiesContext.Provider value={{ cities, loading, currentCity, error, getCity, createCity, deleteCity }}>
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