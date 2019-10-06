$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?apikey=1e47d44f&s=" + searchText)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3 mb-3">
            <div class="well text-center">
            <img src="${movie.Poster}"></img>
              <h5>${movie.Title}</h5>
              <h5>${movie.Year}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Description</a>
            </div>
          </div>
        `;
      });

      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("http://www.omdbapi.com/?apikey=1e47d44f&i=" + movieId)
    .then(response => {
      console.log(response);
      let movies = response.data;
      let output = `
     <div class="row">
     <div class="col-md-4">
       <img src="${movies.Poster}" class="thumbnail">
     </div>
     <div class="col-md-8">
     <h3 class="text-center">${movies.Title}</h3>
      <ul class="list-group">
      <li class="list-group-item"><strong>Genre :</strong> ${movies.Genre}</li>
      <li class="list-group-item"><strong>Country :</strong> ${movies.Country}</li>
      <li class="list-group-item"><strong>Released :</strong> ${movies.Released}</li>
      <li class="list-group-item"><strong>Director :</strong> ${movies.Director}</li>
      <li class="list-group-item"><strong>Rated :</strong> ${movies.Rated}</li>
      <li class="list-group-item"><strong>Writer :</strong> ${movies.Writer}</li>
      <li class="list-group-item"><strong>Actor :</strong> ${movies.Actors}</li>
      <li class="list-group-item"><strong>Production :</strong> ${movies.Production}</li>
      </ul>
     </div>
     </div>

     <div class="row mt-3">
      <div class="well">
        <h3>Plot</h3>
        ${movies.Plot}
        <hr>
        <a href="https://www.imdb.com/title/${movies.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href='index.html' class="btn btn-success">Back to Search </a>
      </div>
     </div>
     `;
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function getMovieDisp() {
  axios.get();
}
