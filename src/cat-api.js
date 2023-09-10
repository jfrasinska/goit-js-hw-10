import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ZpsxYaY2I9CRaYfoTH4mKs5B5ZVSbbu4jcYjaJRDqrKXQm63Xj2vDeSzi65RrFFH';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Błąd podczas pobierania ras:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Błąd podczas pobierania informacji o kocie:', error);
      throw error;
    });
}
