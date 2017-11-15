// "use strict";
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

function updateMovies() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        let movieHTML = "";
        let currentMoviesHTML = "";
        movies.forEach(({title, rating, id}) => {
            $.get(`http://www.omdbapi.com/?t=${title}&apikey=f9b07338&`, {}).done(function (data) {
                console.group(title);
                movieData = {
                    poster: data.Poster,
                    director: data.Director,
                    year: data.Year
                };
                console.log(movieData);
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                console.log("data= ", movieData);
                let backgroundImageStyling = `"background-image: url('${movieData.poster}');background-repeat:no-repeat;background-image: contain"`;

                movieHTML += `<div class="displayBox" style=${backgroundImageStyling}>`;
                movieHTML += `<div class="textArea">${title} <div class="smallerFont">`;
                movieHTML += `${movieData.director}, ${movieData.year} <div class="smallerFont">rating: ${rating}</div>`;
                movieHTML += `</div></div></div>`;
                $("#movieData").html(movieHTML);
                currentMoviesHTML += `<option value=${id} class="value">${title}</option>`;
                $("#movies").html(currentMoviesHTML);
                $("#movieToEdit").val($("#movies option:selected").text());
                $(".displayBox").click(
                    function () {
                        $(this).css({"border": "5px solid red", "border-radius": "5px"});
                        $(this).addClass('active');
                    });

                //********** delete movie

                $('#deleteMovieBtn').click(function (e) {
                    e.preventDefault();

                    // $(".active").each((movie) => {
                    //     console.log("movie to delete", movie.id);
                    //     const options = {
                    //         method: 'DELETE',
                    //         headers: {
                    //             'Content-Type': 'application/json',
                    //         }
                    //     };
                    //     fetch(`/api/movies/2`, options)
                    //         .then(() => console.log('delete was created successfully!'))
                    //         .catch(() => console.log('Error on post'));
                    // })
                    // updateMovies();
                });
                //************* delete movie
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

$('#addMovie').click(function (e) {
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

$('#movies').change(function () {
    $("#movieToEdit").val($("#movies option:selected").text());
});

$('#editMovie').click(function (e) {
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

