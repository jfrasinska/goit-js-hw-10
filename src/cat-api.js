import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ZpsxYaY2I9CRaYfoTH4mKs5B5ZVSbbu4jcYjaJRDqrKXQm63Xj2vDeSzi65RrFFH';

export function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error('Błąd podczas pobierania ras:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return Promise.all([
    axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    ),
    fetchBreedInfo(breedId),
  ])
    .then(([catResponse, breedInfo]) => {
      const cat = catResponse.data[0];
      cat.breedInfo = breedInfo;
      return cat;
    })
    .catch(error => {
      console.error('Błąd podczas pobierania informacji o kocie:', error);
      const catInfo = document.querySelector('.cat-info');
      catInfo.innerHTML =
        'Błąd podczas pobierania informacji o kocie. Przeładuj stronę.';
      throw error;
    });
}

export function fetchBreedInfo(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds/${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Błąd podczas pobierania informacji o rasie:', error);
      throw error;
    });
}
