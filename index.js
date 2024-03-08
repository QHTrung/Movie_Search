const api_key = 'be96316c';

const movieNameInput = document.getElementById('movie-name');
const searchBtn = document.getElementById('search-btn');
const resultContainer = document.querySelector('.result');

let getMovie = async () => {
  let movieName = movieNameInput.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${api_key}`;
  console.log('Movie name:', movieName);
  console.log(('URL:', url));
  if (movieName.length <= 0) {
    resultContainer.innerHTML = `
    <h3>Please enter the movie name</h3>
    `;
  } else {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      resultContainer.innerHTML = `
      <div class="info">
          <img src=${data.Poster} class="poster">
          <div>
              <h2>${data.Title}</h2>
              <div class="rating">
                  <img src="star-icon.svg">
                  <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                  <span>${data.Rated}</span>
                  <span>${data.Year}</span>
                  <span>${data.Runtime}</span>
              </div>
              <div class="genre">
                  <div>${data.Genre.split(',').join('</div><div>')}</div>
              </div>
          </div>
      </div>
      <h3>Plot:</h3>
      <p>${data.Plot}</p>
      <h3>Cast:</h3>
      <p>${data.Actors}</p>
  `;
    } catch (error) {
      console.log('Error:', error);
    }
  }
};

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);
