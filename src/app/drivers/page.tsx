'use client';
import useGetDrivers from "@/hooks/useGetDrivers";

function Page() {
    const url = 'https://api.openf1.org/v1/drivers?session_key=latest'
    const { data, loading, error } = useGetDrivers(url);

    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    return (
      <div>
        {Array.isArray(data) ? (
          data.map((driver) => (
            <div key={driver.driver_number}>
              <h3 style={{ 
                color: driver.team_colour ? `#${driver.team_colour}` : '#000000' }}>
                {driver.full_name}
              </h3>
              <img
                src={driver.headshot_url ?? 'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2024Drivers/lawson'}
                alt={`${driver.full_name}'s headshot`}   // Corrected the alt attribute
                style={{ width: '100px' }}
              />
              <h3>Team: {driver.team_name ?? "N/A"}</h3>
              <h3>Country: {driver.country_code ?? "N/A"}</h3>
            </div>
          ))
        ) : (
          <div>No drivers data available</div>
        )}
      </div>
    );
}

export default Page;