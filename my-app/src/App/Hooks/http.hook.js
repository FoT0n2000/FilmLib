import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, SetLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const request = useCallback( async (url, method = "GET", body = null, headers = {}) => {
        SetLoading(true);
        try{
            if(body){
                body = JSON.stringify(body);

                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url,{method, body, headers});

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Что-то пошло не так");
            }

            SetLoading(false);
            return data;
        }
        catch (e){

            SetLoading(false);
            setError(e.message);

            throw e;
        }
    }, []);

    const ClearError = useCallback(() => setError(null)); 

    return {loading, request, error, ClearError};
}