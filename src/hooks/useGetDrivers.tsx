/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from "react";
import { useState, useEffect } from 'react';

const useGetDrivers = (apiUrl) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>{
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(fetchedData => {
                setData(fetchedData);
                setLoading(false);
                console.log(fetchedData)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [apiUrl]);

    return { data, loading, error };

}

export default useGetDrivers;