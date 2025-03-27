import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Base_URL from '../../Base_URL'; 


export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${Base_URL}/api/users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setUserDetails({
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address
                    });
                } else {
                    console.error('Error fetching user details:', data.message);
                    setUserDetails(null);
                }
            } catch (error) {
                console.error('Network error:', error);
                setUserDetails(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [token]);

    return (
        <UserDetailsContext.Provider value={{ userDetails, loading }}>
            {children}
        </UserDetailsContext.Provider>
    );
};
