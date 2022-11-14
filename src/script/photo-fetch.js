export default async function photoFetch(name) {
    const BASE_URL = 'https://pixabay.com/api/'
    const API_KEY = '31327013-dff4de219bc981e4672d8ee09'
    const FILTERS = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(name)}${FILTERS}`     

    const response = await fetch(url)
    return response.json()
}

// export default async function photoFetch(name) {
//     const BASE_URL = 'https://pixabay.com/api/'
//     const API_KEY = '31327013-dff4de219bc981e4672d8ee09'
//     const FILTERS = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
//     const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(name)}${FILTERS}`     

//     const response = await axios.get(url);
//     return response.json()
// }