$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    // window.location = "searchMovies.html";
    $("#movieDisplay").html("");
    $(".h3").html("");

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
      $("#searchText").val("");
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
  axios
    .get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US&page=1"
    )
    .then(response => {
      console.log(response);
      let movieDisp = response.data.results;
      let outputMovie = "";

      $.each(movieDisp, (index, movieDis) => {
        outputMovie += `
            <div class="col-md-3">
              <img src="https://image.tmdb.org/t/p/w500/${movieDis.poster_path}
              " class="card-img mb-3" alt="...">
            </div>

            <div class="col-md-3">
              <div class="card-body">
                <h5 class="card-title">${movieDis.original_title}</h5>
               
                <p class="card-text">Released : ${movieDis.release_date}</p>
                <a onclick="idMovie('${movieDis.id}')" class="btn btn-primary" href="#">Movie Description</a>
            </div>
                
              </div>
            </div>
        `;
      });
      $("#movieDisplay").html(outputMovie);
    });
}

function getMovieUpcoming() {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US&page=1"
    )
    .then(response => {
      console.log(response);
      let movieDisp = response.data.results;
      let outputMovie = "";

      $.each(movieDisp, (index, movieDis) => {
        outputMovie += `
            <div class="col-md-3">
              <img src="https://image.tmdb.org/t/p/w500/${movieDis.poster_path}
              " class="card-img mb-3" alt="...">
            </div>

            <div class="col-md-3">
              <div class="card-body">
                <h5 class="card-title">${movieDis.original_title}</h5>
                
                <p class="card-text">Released : ${movieDis.release_date}</p>
                <a onclick="idMovie('${movieDis.id}')" class="btn btn-primary" href="#">Movie Description</a>
            </div>
                
              </div>
            </div>
        `;
      });
      $("#movieDisplay").html(outputMovie);
    });
}

function idMovie(id) {
  sessionStorage.setItem("movie_id", id);
  window.location = "movieDisplay.html";
  return false;
}

function getMovieDis() {
  let movId = sessionStorage.getItem("movie_id");
  axios
    .get(
      "https://api.themoviedb.org/3/movie/" +
        movId +
        "?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US"
    )
    .then(response => {
      console.log(response);
      let movieId = response.data;
      let outputDesc = `
      <div class="row">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w300/${
          movieId.poster_path
        }" class="thumbnail">
      </div>
      <div class="col-md-8">
      <h3 class="text-center">${movieId.original_title}</h3>
       <ul class="list-group">
       <li class="list-group-item"><strong>Genre :</strong> ${
         movieId.genres[0]["name"]
       }</li>
    
       <li class="list-group-item"><strong>Released :</strong> ${
         movieId.release_date
       }</li>

       <li class="list-group-item"><strong>Status :</strong> ${movieId.status}
        </li>
      
       </ul>
      </div>
      </div>
 
      <div class="row mt-3">
       <div class="well">
         <h3>Plot</h3>
         ${movieId.overview}
         <hr>
         <a href="https://www.imdb.com/title/${
           movieId.imdb_id
         }" target="_blank" class="btn btn-primary">View IMDB</a>
         <a href='upcoming.html' class="btn btn-success">Back to Search </a>
       </div>
      </div>
      
      `;
      $("#moviesDis").html(outputDesc);
    });
}

function trendingMovie() {
  axios
    .get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=0ccd87f544c7e54dafba594584acc692"
    )
    .then(response => {
      console.log(response);
      let movieDisp = response.data.results;
      let outputMovie = "";

      $.each(movieDisp, (index, movieDis) => {
        outputMovie += `
            <div class="col-md-3">
              <img src="https://image.tmdb.org/t/p/w500/${movieDis.poster_path}
              " class="card-img mb-3" alt="...">
            </div>

            <div class="col-md-3">
              <div class="card-body">
                <h5 class="card-title">${movieDis.original_title}</h5>
                
                <p class="card-text">Released : ${movieDis.release_date}</p>
                <a onclick="idMovie('${movieDis.id}')" class="btn btn-primary" href="#">Movie Description</a>
            </div>
                
              </div>
            </div>
        `;
      });
      $("#movieDisplay").html(outputMovie);
    });
}

function tvPop() {
  axios
    .get(
      "https://api.themoviedb.org/3/tv/popular?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US&page=1"
    )
    .then(response => {
      console.log(response);
      let movieDisp = response.data.results;
      let outputMovie = "";

      $.each(movieDisp, (index, movieDis) => {
        outputMovie += `
            <div class="col-md-3">
              <img src="https://image.tmdb.org/t/p/w500/${movieDis.poster_path}
              " class="card-img mb-3" alt="...">
            </div>

            <div class="col-md-3">
              <div class="card-body">
                <h5 class="card-title">${movieDis.original_name}</h5>
                <p class="card-text">Popularity : ${movieDis.popularity}</p>
                <a onclick="idMovie('${movieDis.id}')" class="btn btn-primary" href="#">Tv Show Description</a>
            </div>
                
              </div>
            </div>
        `;
      });
      $("#movieDisplay").html(outputMovie);
    });
}

function tvDesc() {
  let movId = sessionStorage.getItem("movie_id");
  axios
    .get(
      "https://api.themoviedb.org/3/tv/" +
        movId +
        "?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US"
    )
    .then(response => {
      console.log(response);
      let movieId = response.data;
      let outputDesc = `
      <div class="row">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w300/${
          movieId.poster_path
        }" class="thumbnail">
      </div>
      <div class="col-md-8">
      <h3 class="text-center">${movieId.original_name}</h3>
       <ul class="list-group">
       <li class="list-group-item"><strong>Genre :</strong> ${
         movieId.genres[0]["name"]
       }, ${movieId.genres[1]["name"]}</li>
    
       <li class="list-group-item"><strong>Created by :</strong> ${
         movieId.created_by[0]["name"]
       }</li>

       <li class="list-group-item"><strong>Production :</strong> ${
         movieId.production_companies[0]["name"]
       }
        </li>

        
      
       </ul>
      </div>
      </div>
 
      <div class="row mt-3">
       <div class="well">
         <h3>Plot</h3>
         ${movieId.overview}
         <hr>
         <a href='tvSeasons.html' class="btn btn-success">Back to Search </a>
       </div>
      </div>
      
      `;
      $("#moviesDis").html(outputDesc);
    });
}

function tvEps() {
  axios
    .get(
      "https://api.themoviedb.org/3/tv/airing_today?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US&page=1"
    )
    .then(response => {
      console.log(response);
      let movieDisp = response.data.results;
      let outputMovie = "";

      $.each(movieDisp, (index, movieDis) => {
        outputMovie += `
            <div class="col-md-3">
              <img src="https://image.tmdb.org/t/p/w500/${movieDis.poster_path}
              " class="card-img mb-3" alt="...">
            </div>

            <div class="col-md-3">
              <div class="card-body">
                <h5 class="card-title">${movieDis.original_name}</h5>
                <p class="card-text">${movieDis.popularity}</p>
                <p class="card-text">Released : ${movieDis.first_air_date}</p>
                <a onclick="idMovie('${movieDis.id}')" class="btn btn-primary" href="#">Tv Show Description</a>
            </div>
                
              </div>
            </div>
        `;
      });
      $("#movieDisplay").html(outputMovie);
    });
}

function tvAir() {
  let movId = sessionStorage.getItem("movie_id");
  axios
    .get(
      "https://api.themoviedb.org/3/tv/" +
        movId +
        "?api_key=0ccd87f544c7e54dafba594584acc692&language=en-US"
    )
    .then(response => {
      console.log(response);
      let movieId = response.data;
      let outputDesc = `
      <div class="row">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w500/${
          movieId.poster_path
        }" class="thumbnail">
      </div>
      <div class="col-md-8">
      <h3 class="text-center">${movieId.results[0]["name"]}</h3>
       <ul class="list-group">
       <li class="list-group-item"><strong>Genre :</strong> ${
         movieId.genres[0]["name"]
       }</li>
    
       <li class="list-group-item"><strong>Created by :</strong> ${
         movieId.created_by[0]["name"]
       }</li>

       <li class="list-group-item"><strong>Production :</strong> ${
         movieId.production_companies[1]["name"]
       }
        </li>

       
      
       </ul>
      </div>
      </div>
 
      <div class="row mt-3">
       <div class="well">
         <h3>Plot</h3>
         ${movieId.overview}
         <hr>
         <a href='tvEpisode.html' class="btn btn-success">Back to Search </a>
       </div>
      </div>
      
      `;
      $("#moviesDis").html(outputDesc);
    });
}
