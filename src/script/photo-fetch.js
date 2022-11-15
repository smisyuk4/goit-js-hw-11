const axios = require('axios').default;

export default async function photoFetch(name, numberPage) {
    const BASE_URL = 'https://pixabay.com/api/'
    const API_KEY = '31327013-dff4de219bc981e4672d8ee09'
    const FILTERS = '&image_type=photo&orientation=horizontal&safesearch=true'
    const PAGINATION = `&per_page=${40}&page=${numberPage}`
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(name)}${FILTERS}${PAGINATION}`     

    return await axios.get(url)
}