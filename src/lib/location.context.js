'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const res = await fetch('https://ipinfo.io/json');
                const data = await res.json();
                setLocationData(data);
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        fetchLocationData();
    }, []);

    return (
        <LocationContext.Provider value={{ locationData }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
