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
                // console.group(title);
                movieData = {
                    poster: data.Poster,
                    director: data.Director,
                    year: data.Year
                };
                // console.log(movieData);
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                // console.log("data= ", movieData);
                let backgroundImageStyling = `"background-image: url('${movieData.poster}');background-repeat:no-repeat;background-image: cover; border-radius: 10px"`;

                movieHTML += `<div class="displayBox" style=${backgroundImageStyling} data-dbid="${id}">`;
                movieHTML += `<div class="textArea">${title} <div class="smallerFont">`;
                movieHTML += `${movieData.director}, ${movieData.year} <div class="smallerFont">rating: ${rating}</div>`;
                movieHTML += `</div></div></div>`;
                $("#movieData").html(movieHTML);
                currentMoviesHTML += `<option value=${id} class="value">${title}</option>`;
                $("#movies").html(currentMoviesHTML);
                $("#movieToEdit").val($("#movies option:selected").text());

                $(".displayBox").click(
                    function () {
                        $(this).toggleClass('active');
                        // $("#deleteMovieBtn").toggleClass("invisible");
                    });

            }).fail(function () {
                console.log("error on request");
            });
        });


    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

//********** delete movie

$('#deleteMovieBtn').click(function (e) {
    e.preventDefault();
    console.log("movie to delete", $(".active").data("dbid"));

    $(".active").each((selectedMovie) => {
        let thisMovie = $(".active")[selectedMovie];
        let movieId = $(thisMovie).data("dbid");

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(`/api/movies/${movieId}`, options)
            .then(() => {
                console.log('delete a movie was created successfully!');
                updateMovies();
            })
            .catch(() => console.log('Error on post'));
    });


});
//************* delete movie

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
        .then(() => {
            console.log('add a movie post was created successfully!');
            updateMovies();
        })
        .catch(() => console.log('Error on post'));

});

// $('#movies').change(function () {
//     $("#movieToEdit").val($("#movies option:selected").text());
// });
//
// $('#editMovie').click(function (e) {
//     e.preventDefault();
//
//     console.log($('#movieToEdit').val());
//     console.log($('#newRating').val());
//
//
//     const newMovie = {
//         title: $('#movieToEdit').val(),
//         rating: $('#newRating').val()
//     };
//     const options = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMovie),
//     };
//     fetch('/api/movies/', options)
//         .then(() => console.log('edit a movie post was created successfully!'))
//         .catch(() => console.log('Error on post'));
//     updateMovies();
// });

