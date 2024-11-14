'use client';
import useGetDrivers from "@/hooks/useGetDrivers";

function Page() {
    const { data, loading, error } = useGetDrivers();

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
              <h3>{driver.full_name}</h3>
              <img src={driver.headshot_url} alt="Driver Headshot" />
            </div>
          ))
        ) : (
          <div>No drivers data available</div>
        )}
      </div>
    );
}

export default Page;