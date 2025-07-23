import React from 'react';

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const request = React.useCallback(async (url, options) => {
        let response;
        let json;
        try {
            setError(null);
            setLoading(true);
            response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Erro | Status: ${response.status}`);
            }
            json = await response.json();
            setData(json);
            console.log(json);
        } catch (err) {
            setError(err.message || 'Erro desconhecido.');
        } finally {
            setLoading(false);
        }
        return { response, json };
    }, []);

    return {
        data,
        error,
        loading,
        request,
        setData,
        setError,
        setLoading
    }
}

export default useFetch;