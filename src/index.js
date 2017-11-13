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

   function updateMovies() {
       getMovies().then((movies) => {
           console.log('Here are all the movies:');
           let movieHTML = "";
           let currentMoviesHTML = "";
           movies.forEach(({title, rating, id}) => {
               console.log(`id#${id} - ${title} - rating: ${rating}`);
               movieHTML += `<div>id#${id} - ${title} - rating: ${rating}`;
               movieHTML += `<input id="checkBox" type="checkbox"></div>`;
               $("#movieData").html(movieHTML);
               currentMoviesHTML += `<option value=${id} class="value">${title}</option>`;
               $("#movies").html(currentMoviesHTML);
               $("#movieToEdit").val($("#movies option:selected").text());
           });
       }).catch((error) => {
           alert('Oh no! Something went wrong.\nCheck the console for details.');
           console.log(error);
       });
   }

   updateMovies();

    $('#submitMovie').click(function(e) {
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