import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', function () {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  breedSelect.addEventListener('change', function () {
    const selectedBreed = breedSelect.value;

    loader.style.display = 'block';
    error.style.display = 'none';

    fetchCatByBreed(selectedBreed)
      .then(cat => {
        loader.style.display = 'none';

        if (cat && cat.url) {
          catInfo.innerHTML = `<img src="${cat.url}" alt="Kot" />`;
        } else {
          catInfo.innerHTML = 'Nie znaleziono zdjęć kota tej rasy.';
        }
      })
      .catch(error => {
        loader.style.display = 'none';
        error.style.display = 'block';
        console.error('Wystąpił błąd:', error);
      });
  });

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Błąd podczas pobierania ras:', error);
    });
});
