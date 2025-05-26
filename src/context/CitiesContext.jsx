import { createContext, useEffect, useReducer } from 'react';
import { useContext } from 'react';

const CitiesContext = createContext();

const Base_URL = 'https://restcountries.com/v3.1/all';  // Rest Countries API endpoint

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "city/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "get/city":
      return { ...state, loading: false, currentCity: action.payload };
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
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "loading" });

    fetch(Base_URL)
      .then(res => res.json())
      .then(data => {
        // Map countries to your city format using capital city and flags
        const formatted = data
          .filter(country => country.capital && country.capital.length > 0) // only countries with capitals
          .slice(0, 10)  // pick first 10 for example
          .map(country => ({
            id: crypto.randomUUID(),
            cityName: country.capital[0],
            country: country.name.common,
            date: new Date().toISOString(),
            notes: "",
            emoji: country.flags?.png || "",  // flag image URL
            position: {
              lat: country.latlng ? country.latlng[0].toFixed(6) : null,
              lng: country.latlng ? country.latlng[1].toFixed(6) : null,
            }
          }));

        dispatch({ type: "city/loaded", payload: formatted });
      })
      .catch(error => {
        console.error("Fetch failed:", error);
        dispatch({ type: "rejected", payload: "There was an error loading data." });
      });
  }, []);

  // These functions simulate POST and DELETE on local state (since Rest Countries API is read-only)
    async function createCity(newCity) {
      dispatch({ type: "loading" });
    
      // 🔥 Check for duplicates first!
      const alreadyExists = cities.some(c => c.cityName === newCity.cityName);
      if (alreadyExists) {
        dispatch({ type: "rejected", payload: "City already exists." });
        return;
      }
     
      try {
        // 🌍 Fetch flag for this country from REST Countries API
        const response = await fetch(`https://restcountries.com/v3.1/name/${newCity.country}`);
        const result = await response.json();
        const country = result?.[0];
    
        const data = {
          ...newCity,
          id: Math.random().toString(36).substring(2, 9),
          date: new Date().toISOString(),
          emoji: country?.flags?.png || "",  // ✅ Add flag image
          position: newCity.position || { lat: null, lng: null },
        };
    
        dispatch({ type: "city/created", payload: data });
    
      } catch {
        console.error("Fetch failed:", error);
        dispatch({ type: "rejected", payload: "There was an error creating city." });
      }
    }



  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "There was an error deleting city." });
    }
  }

  function getCity(id) {
    const city = cities.find(c => c.id === id);
    if (city) {
      dispatch({ type: "get/city", payload: city });
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, loading, currentCity, error, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
