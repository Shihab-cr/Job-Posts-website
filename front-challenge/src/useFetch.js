import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(()=>{
        setIsLoading(true);
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw Error(" failed to load from Database 404 check useFetch");
            }
            return res.json();
        })
        .then((data)=>{
            setIsLoading(false);
            setData(data);
        })
        .catch((err)=>{
            setIsLoading(false);
            setError(err.message);
        })
    }, [url])
    useEffect(()=>{
        refetch();
    },[refetch])
    
    return ( {data, isLoading, error, refetch});
}

export default useFetch;