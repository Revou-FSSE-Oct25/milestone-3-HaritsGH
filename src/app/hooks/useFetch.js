import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorSource, setErrorSource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response went wrong.');
        }
        const result = await response.json();
        setData(result);
      } catch (errir) {
        setErrorSource('fetching')
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, errorSource}
}