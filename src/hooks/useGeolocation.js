import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
    const [position, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function getPosition()  {
        if (!navigator.geolocation) {
            return setError("Geolocation is not supported by your browser.");
        }
        
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );
    };

    return { position, error, loading, getPosition };
}