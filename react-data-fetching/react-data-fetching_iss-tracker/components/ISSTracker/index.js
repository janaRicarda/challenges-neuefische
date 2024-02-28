import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function ISSTracker() {
  useSWR(URL, {
    refreshInterval: 5000,
  });

  const { data, isLoading, error, mutate } = useSWR(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );

  if (error) return <h1>Loading failed...</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  /* const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  }); */

  /*  async function getISSCoords() {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setCoords({ longitude: data.longitude, latitude: data.latitude });
      }
    } catch (error) {
      console.error(error);
    }
  } */

  /* useEffect(() => {
    const timer = setInterval(() => {
      getISSCoords();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);
 */
  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        // onRefresh={getISSCoords}
        onRefresh={() => {
          mutate();
        }}
      />
    </main>
  );
}
