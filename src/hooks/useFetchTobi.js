'use client';

import { useState, useEffect } from "react";

export function useFetchTobi(url) {
  // This hook is used to fetch data from an API Endpoint
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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
      } catch (error) {
        setErrorMessage(error.message || 'Fetch failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, errorMessage }
}