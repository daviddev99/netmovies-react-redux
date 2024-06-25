
const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTFkNzQ0ODYyZDhiNTY0YTRkY2MzOWY2NTQ1OTc5MSIsIm5iZiI6MTcxOTM0ODk0MS45NDU2MDgsInN1YiI6IjY0MGY3MDc5YTZjMTA0MDBjMGM1MWY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EewJkWNQzCXuwa4A5myXcLsqcXB6KeE6DOq7svsr_Fk'
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