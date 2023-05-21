import { useState, useEffect } from 'react'
import axios from 'axios'
// import { RAPID_API_KEY } from 'react-native-dotenv'
// import { RAPID_API_KEY } from '@env'
// import Config from 'react-native-config';

// const rapidApiKey = Config.RAPID_API_KEY
// console.log("Config.Rapid: ", rapidApiKey)
// const rapidApiKey = process.env['RAPID_API_KEY'];
// console.log("rapidAPI : ", rapidApiKey)
// console.log("rapidApiKeu: ", RAPID_API_KEY)

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': '44ac52da64msh4383453338ecf61p1b8df8jsn879e3850fce1', //RAPID_API_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query},
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            console.log("response: ", response)
            setData(response.data.data);
            setIsLoading(false)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch