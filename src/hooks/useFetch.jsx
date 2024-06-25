import { useEffect, useState } from "react"
import { fetchFromApi } from "../api"
const useFetch = (url) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setData([])
        setError(false)
        try {
            fetchFromApi(url)
            .then((res) => {
                setData(res)
                setLoading(false)
            })
        } catch (error) {
            setLoading(false)
            setError("Something went wrong")
        }
    },[url])

  return {data,error,loading}
}

export default useFetch
