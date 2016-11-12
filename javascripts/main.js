"use strict";

let apiKeys = {};
let uid = "";

function movieToDOM () {
  NFAPI.getMovie(apiKeys, uid).then(function(movies){
    console.log("api preloaded movies", movies);
  });
}

$(document).ready(function(){
 NFAPI.firebaseCredentials().then(function(keys){
   console.log("keys", keys);
   apiKeys = keys;
   firebase.initializeApp(apiKeys);
   console.log(apiKeys);
 });




 $('#registerButton').on('click', function(){
   let email = $('#inputEmail').val();
   let password = $('#inputPassword').val();
   let user = {
     "email": email,
     "password": password
   };

   NFAPI.registerUser(user).then(function(registerResponse){
     console.log("register response", registerResponse);
     let newUser = {
       "uid": registerResponse.uid
     };
     return NFAPI.addUser(apiKeys, newUser);

   }).then(function(addUserResponse){

     return NFAPI.loginUser(user);
   }).then(function(loginResponse){
     console.log("login response", loginResponse);
     uid = loginResponse.uid;
   // putTodoInDOM();
   $('#login-container').addClass("hide");
   $('#movie-container').removeClass("hide");
 });
 });

 $('#loginButton').on("click", function(){
   let email = $('#inputEmail').val();
   let password = $('#inputPassword').val();

   let user = {
     "email": email,
     "password": password
   };
   NFAPI.loginUser(user).then(function(loginResponse){
     uid = loginResponse.uid;
   // putTodoInDOM();
   $('#login-container').addClass("hide");
   $('#movie-container').removeClass("hide");
 });
 });


 let movieList = (searchText) => {
  return new Promise ((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: '../apiKeys.json'
    }).then((response) => {
      console.log("API response: ", response);
      apiKeys = response;

      $.ajax({
        method: 'GET',
        url: `http://www.omdbapi.com/?t="${searchText}"&y=&plot=short&r=json`
      }).then((response2) => {
        console.log("movie response: ", response2);
        resolve(response2);
      }, (errorResponse2) => {
        console.log("movie fail: ", errorResponse2);
        reject(errorResponse2);
      });


    }, (errorResponse) => {
      console.log("errorResponse:", errorResponse); // these 2 lines are an error message if the 'then' statement fails
      reject(errorResponse);
    });
  });
};

$('#searchButton').on("click",function(items){
  let movieSearched = $("#OMDBsearch").val();
  console.log("movieSearched", items);
  movieList(movieSearched).then((dataFromApi)=>{
    $('searchButton').button("reset");
    console.log("data",dataFromApi);
    let searched = $('#search-results').append(
      `<img src="${dataFromApi.Poster}">
      <h2> ${dataFromApi.Title} </h2>
      <h5> ${dataFromApi.Year} </h5>
      <h5> ${dataFromApi.Actors} </h5>
      <p> ${dataFromApi.imdbRating} </p>
      <button class="btn btn-primary addToWishlist">Add to Wishlist</button>
      `);
  });
  $(".addToWishlist").on("click", function(wishedMovies, items){
    console.log("test click");
    let movieSearched = $("#OMDBsearch").val();
    console.log("movieSearched", items);
    movieList(movieSearched).then((dataFromApi)=>{
    // $('searchButton').button("reset");
    let wished = $('#wishlist').append(
      `<img src="${dataFromApi.Poster}">
      <h2> ${dataFromApi.Title} </h2>
      <h5> ${dataFromApi.Year} </h5>
      <h5> ${dataFromApi.Actors} </h5>
      <p> ${dataFromApi.imdbRating} </p>
      <button class="btn btn-primary removeFromnList">remove</button>
      `);
  });
  });
});






});