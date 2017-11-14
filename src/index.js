// $(document).ready(function () {
//     "use strict";
    /**
     * es6 modules and imports
     */

    // import sayHello from './hello';
    // sayHello('World');

    /**
     * require style imports
     */
    const $ = require('jquery');

    const {getMovies} = require('./api.js');

    let movieData = {};

    let movieDataObject = {};

    function getMovieData(movie) {

    }


   function updateMovies() {
       getMovies().then((movies) => {
           console.log('Here are all the movies:');
           let movieHTML = "";
           let currentMoviesHTML = "";
           movies.forEach(({title, rating, id}) => {
               $.get(`http://www.omdbapi.com/?t=${title}&apikey=f9b07338&`, {

               }).done(function (data) {
                   console.group(title);
                   movieData = {
                       poster: data.Poster,
                       director: data.Director,
                       year: data.Year
                   };

                   console.log(movieData);

                   console.log(`id#${id} - ${title} - rating: ${rating}`);
                   console.log("data= ", movieData);
                   movieHTML += `<div class="displayBox" style="background-image: url('${movieData.poster.trim()}')">`;
                   movieHTML += `${title} <div class="smallerFont">${movieData.director}, ${movieData.year} <div class="smallerFont">rating: ${rating}</div></div></div>`;
                   $("#movieData").html(movieHTML);
                   currentMoviesHTML += `<option value=${id} class="value">${title}</option>`;
                   $("#movies").html(currentMoviesHTML);
                   $("#movieToEdit").val($("#movies option:selected").text());
                   console.groupEnd(title);

               }).fail(function () {
                   console.log("error on request");
               });



           });
       }).catch((error) => {
           alert('Oh no! Something went wrong.\nCheck the console for details.');
           console.log(error);
       });
   }

   updateMovies();

    $('#addMovie').click(function(e) {
        e.preventDefault();
        const newMovie = {
           title: $('#title').val(),
           rating: $('#rating').val()
       };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch('/api/movies', options)
            .then(() => console.log('post was created successfully!'))
            .catch(() => console.log('Error on post'));
        updateMovies();
    });

    $('#movies').change(function() {
        $("#movieToEdit").val($("#movies option:selected").text());

    });

    $('#editMovie').click(function(e) {
        e.preventDefault();
        const newMovie = {
            title: $('#title').val(),
            rating: $('#rating').val()
        };
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch('/api/movies', options)
            .then(() => console.log('post was created successfully!'))
            .catch(() => console.log('Error on post'));
        updateMovies();
    });




    $('#deleteMovie').click(function(e) {
       e.preventDefault();
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch('/api/movies/9', options)
            .then(() => console.log('delete was created successfully!'))
            .catch(() => console.log('Error on post'));
        updateMovies();
    });

// })