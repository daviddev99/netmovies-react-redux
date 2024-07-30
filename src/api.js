
const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + TMDB_TOKEN
  }
}
export const fetchFromApi = async(url) => {
    try{
        const res = await fetch(BASE_URL + url, options)
        const data = await res.json()
        return data
    }catch(e){
        console.log(e)
    }
}