/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from 'react';

export function useFetch<T = unknown>(
    endpoint?: string,
    method = 'GET',
    data: any = {},
    headers: any = {}
) {
    const [response, setResponse] = useState<T | null>();
    const [error, setError] = useState<string | null>();
    const [fetching, setFetching] = useState(false);

    const request = useCallback(async (endpoint: string, method = 'GET',
        data: any = {},
        headers: any = {}) => {

        return new Promise<T>((resolve) => {
            let authorization = {}
            const token = localStorage.getItem('token');
            if (token) {
                authorization = {
                    Authorization: `Bearer ${token}`
                }
            }
            const config: any = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                    ...authorization,
                }
            };

            if (method !== 'GET') {
                config.body = JSON.stringify(data);
            }

            const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}`;
            const url = `${baseUrl}${endpoint}`;
            setFetching(true);

            fetch(url, config)
                .then(async (res) => {
                    const json = await res.json();
                    if (!res.ok) {
                        setError(json.message);
                    }

                    setResponse(json);
                    resolve(json)
                })
                .catch((e) => setError(e))
                .finally(() => setFetching(false));
        })
    }, []);

    useEffect(() => {
        if (!endpoint) {
            return;
        }
        request(endpoint, method, data, headers);
    }, [endpoint, method, data, headers, request]);

    return { request, response, error, fetching };
}
