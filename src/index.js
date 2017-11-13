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

    getMovies().then((movies) => {
        console.log('Here are all the movies:');
            let movieHTML = "";
        movies.forEach(({title, rating, id}) => {
            console.log()
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            movieHTML += `<div>id#${id} - ${title} - rating: ${rating}</div>`;
            $("#movieData").html(movieHTML);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });

// })