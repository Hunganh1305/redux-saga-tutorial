import { useState, useEffect, useCallback } from "react";
import API_BASE_URL from "../api/apiConfig";

const useFetch = (url, params = {}, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (method === "GET") {
        response = await API_BASE_URL.get(url, params);
      } else if (method === "POST") {
        response = await API_BASE_URL.post(url, body, params);
      } else if (method === "PUT") {
        response = await API_BASE_URL.put(url, body, params);
      }
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetch;
