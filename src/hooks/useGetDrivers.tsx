/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from "react";
import { useState, useEffect } from 'react';

const url = 'https://api.openf1.org/v1/drivers?session_key=9158';
  
const useGetDrivers = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>{
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(fetchedData => {
                setData(fetchedData);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })

    }, []);

    return { data, loading, error };

}

export default useGetDrivers;