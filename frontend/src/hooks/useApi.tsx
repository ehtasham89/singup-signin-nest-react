import { useState, useCallback } from 'react';

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export const useApi = <T,>() => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const callApi = useCallback(async (url: string, method: string, body?: any, credentials?: boolean) => {
    setResponse((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
        credentials: credentials ? 'include' : 'same-origin', // To send/receive cookies
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse({ data, error: null, isLoading: false });
      return data; 
    } catch (error: any) {
      setResponse({ data: null, error: error.message, isLoading: false });
    }
  }, []);

  return { response, callApi };
};
