'use client';
import { useState, useEffect } from "react";

const useGetWinner = (year: number, country: string, sessionName: string = "Race") => {
    const [data, setData] = useState<any[]>([]);
    const [positionData, setPositionData] = useState<any[]>([]);
    const [sessionKey, setSessionKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const meetingUrl = `https://api.openf1.org/v1/sessions?country_name=${country}&year=${year}`;

    // Construct the positionUrl with the dynamic sessionKey and position=1
    const positionUrl = sessionKey ? `https://api.openf1.org/v1/position?session_key=${sessionKey}&position=1` : "";

    useEffect(() => {
        const fetchMeetingData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(meetingUrl);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();

                // Filter the sessions to find the one with the specified session_name
                const filteredSession = result.find((session: any) => session.session_name === sessionName);

                if (filteredSession) {
                    setSessionKey(filteredSession.session_key); // Set session_key from the filtered session
                } else {
                    throw new Error(`Session "${sessionName}" not found.`);
                }

                setData(result); // Store all session data (if needed)
                console.log(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetingData();
    }, [year, country, sessionName]);

    // Fetch position data once sessionKey is available
    useEffect(() => {
        if (!sessionKey) return; // Wait for sessionKey before making the second request

        const fetchPositionData = async () => {
            setLoading(true);

            try {
                const response = await fetch(positionUrl);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                setPositionData(result); // Store position data

                console.log(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchPositionData();
    }, [sessionKey, positionUrl]); // Trigger when sessionKey is set

    return { data, positionData, loading, error };
};

export default useGetWinner;

