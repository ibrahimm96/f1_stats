'use client'
import useGetWinner from "@/hooks/useGetWinner";

function Page() {
    const { data, positionData, loading, error } = useGetWinner(2023, 'Belgium',);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <input
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: 'translate(-50%, -75%)',
                    textAlign: 'center',
                    }}
                type="text" 

                //value={inputValue} 
                //onChange={handleInputChange} 
                placeholder="Enter Driver Number" 
            />
            <h1>Race Results</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h2>Position Data (Position 1)</h2>
            <pre>{JSON.stringify(positionData, null, 2)}</pre>
        </div>
    )
}

export default Page;




