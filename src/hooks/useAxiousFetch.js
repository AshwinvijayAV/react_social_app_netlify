import { useState,useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import { set } from 'date-fns';

const useAxiousFetch = (dataUrl) => {
    const [data,setData] = useState([]);
    const [fetchError,setFetchError]=useState(null)
    const [isLoading,setIsLoading]= useState(false);


    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source()

        const fetchData = async (url) =>{
            try{
                   
             const response = await  axios.get(url,{
                cancelToken:source.token
             });
             if (isMounted){
                setData(response.data)
                setFetchError(null)
             }


            }
            catch(err){
              if (isMounted){
                setFetchError(err.message);
                setData([]);
              }


            }
            finally{
                isMounted && 
                setTimeout(()=>{
                    console.log('Setting isLoading to false after delay');
                    setIsLoading(false)},10000);
               
            }


        }
        fetchData(dataUrl);

        const cleanUp = () =>{
            isMounted = false;
            source.cancel()
        }
        return cleanUp

    },[dataUrl]);


  return {data, fetchError, isLoading };
}

export default useAxiousFetch
