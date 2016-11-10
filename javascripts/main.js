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
 console.log("");

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
   // createLogoutButton();
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
   // createLogoutButton();
   // putTodoInDOM();
   $('#login-container').addClass("hide");
   $('#movie-container').removeClass("hide");
 });
});

// $('#logout-container').on("click", "#logoutButton", function(){
//  NFAPI.logoutUser();
//  uid = "";
//  $('#incomplete-tasks').html("");
//  $('#completed-tasks').html("");
//  $('#inputEmail').val("");
//  $('#inputPassword').val("");
//  $('#inputUsername').val("");
//  $('#login-container').removeClass("hide");
//  $('#todo-container').addClass("hide");
// });

});