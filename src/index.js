import {fetchBreeds} from "./cat-api";
import {fetchCatByBreed} from "./cat-api";

const jsContainer = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


loader.classList.remove('is-hidden');
error.classList.add('is-hidden');

fetchBreeds().then(function makeMarkup(data) {
    const markup = data.map(({ name, id }) => `<option value="${id}">${name}</option>`).join("");
    select.insertAdjacentHTML("beforeend", markup);
})
.catch(function onError(error){
    error.classList.remove("is-hidden");
    alert('Error');
})
.finally(() => loader.classList.add('is-hidden'));

select.addEventListener('change', onChange);

function onChange(event) {
    let id = event.target.value;
    loader.classList.remove('is-hidden');

    fetchCatByBreed(id)
    .then(function showCate(data) {
        let catName = data[0].breeds[0].name;
        let catImage = data[0].url;
        let catDescription = data[0].breeds[0].description;
        let catTemperament = data[0].breeds[0].temperament;

        jsContainer.innerHTML = (`<img src="${catImage}" alt="${catName}" width = '500' height = '300'>
        <div><h2 class="title">${catName}</h2>
        <p class="description">${catDescription}</p>
        <p class="temperament">TEMPERAMENT: ${catTemperament}</p></div>`);
    })
    .catch(function onError(data) {
        errorLoad.classList.remove('is-hidden');
        jsContainer.innerHTML = '';
        alert('Error');
    })
    .finally(() => loader.classList.add('is-hidden'))
};
