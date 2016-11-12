"use strict";

var NFAPI = (function(oldFirebase){

// oldFirebase.getMovie = function(moviez){
//   return new Promise((resolve, reject)=>{
//     $.ajax({
//       method: 'GET',
//       url: `http://www.omdbapi.com/?t="${moviez}"&y=&plot=short&r=json`
//     }).then((response)=>{
//       console.log("response from get", response);

//       let items = {};
//         Object.keys(response).forEach(function(key){
//           response[key].id = key; //related to task and isCompleted
//           items.push(response[key]); //this will push an object with all the object info
//         });
//       resolve(items);
//     },(error) =>{
//       console.log(error);
//       reject(error);
//     });
//   });
// };


// oldFirebase.addMovie = function(searched){
//   return new Promise((resolve, reject)=>{
//     $.ajax({
//       method: 'POST',
//       url: `http://www.omdbapi.com/?t=${searched}&y=&plot=short&r=json`,
//       data: JSON.stringify(), //this makes sure that whatever is coming back is valid json
//       dataType: 'json'
//     }).then((response)=>{
//       console.log("response from POST", response);
//       resolve(response);
//     },(error) =>{
//       reject(error);
//     });
//   });
// };

// oldFirebase.deleteMovie = function(apiKeys, itemId){
//   return new Promise((resolve, reject)=>{
//     $.ajax({
//       method: 'DELETE',
//       url: `${apiKeys.databaseURL}/items/${itemId}.json`,
//     }).then((response)=>{
//       console.log("response from DELETE", response);
//       resolve(response);
//     },(error) =>{
//       reject(error);
//     });
//   });
// };

// oldFirebase.editMovie = function(apiKeys, itemId, editedItem){
//   return new Promise((resolve, reject)=>{
//     $.ajax({
//       method: 'PUT',
//       url: `${apiKeys.databaseURL}/items/${itemId}.json`,
//       data: JSON.stringify(editedItem), //this makes sure that whatever is coming back is valid json
//       dataType: 'json'
//     }).then((response)=>{
//       console.log("response from POST", response);
//       resolve(response);
//     },(error) =>{
//       reject(error);
//     });
//   });
// };
return oldFirebase;
})(NFAPI || {});

