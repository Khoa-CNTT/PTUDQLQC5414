import React, { createContext, useState } from 'react';

const ProfileContext = createContext();

function ProfileProvider({ children }) {
    const [name, setName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    return (
        <ProfileContext.Provider value={{ name, phonenumber, address, city, country, setName, setPhonenumber, setAddress, setCity, setCountry }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider }