// console.log('%c HI', 'color: firebrick')

const breedUl = document.querySelector('#dog-breeds');
const breedDropdown = document.querySelector('#breed-dropdown')

// ********** EVENT LISTENERS **********

breedDropdown.addEventListener('change', filterBreed)

// ********** FUNCTIONS **********

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(response => response.json())
    .then(imagesData => imagesData.message.forEach(image => renderImage(image)));
} 

function renderImage(image) {
    let dogImageContainer = document.querySelector('#dog-image-container');
    let dogImage = document.createElement('img');
    dogImage.src = image;
    dogImageContainer.appendChild(dogImage);
}

function fetchBreeds () {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then (response => response.json())
    .then (response => {
        breeds = Object.keys(response.message);
        addToBreedList(breeds)
    });
}

function addToBreedList(breeds) {
    breeds.forEach(breed => addBreed(breed));   
}

function addBreed (breed) {  
    let breedLi = document.createElement('li');
    breedLi.innerHTML = breed;
    breedLi.style.cursor = 'pointer';
    breedUl.appendChild(breedLi);

    breedLi.addEventListener('click', changeBreedColor);
}

function changeBreedColor(event) {
    event.target.style.color = 'darkmagenta';
}

function filterBreed(event) {
    selectBreedBy(event.target.value);
}

function selectBreedBy(letter) {
    clearBreeds(breedUl);
    addToBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function clearBreeds(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}


fetchImages();
fetchBreeds();