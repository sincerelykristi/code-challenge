
// HTML5 drag and drop functions, called globally to get access to data
var drop_handler;
var allowdrop;
var drag;
// variables for current dragged selection
// var tableId = "";
// var currentTable = "";
// var currentAlbumId = "";
// var currentAlbumTitle = "";

$( document ).ready(function() {
  console.log( "all systems go!" );


// First AJAX request to get User name for user id:1 and user id: 2. Append to DOM.
$.ajax({
  url:'https://jsonplaceholder.typicode.com/users',
  method:'GET'
}).then(function(users){
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === 1) {
      $(".user1").text(users[i].name);
      i++
    } if (users[i].id === 2) {
      $(".user2").text(users[i].name);
    }
  };
});

// Second AJAX request to get albums with userId:1 and userId:2. Append to DOM
var ajaxCall = function() {
  $.ajax({
    url:'https://jsonplaceholder.typicode.com/albums',
    method: 'GET'
  }).then(function(albums){

   for (var i = 0; i < albums.length; i++) {
      if (albums[i].userId === 1) {
        $(".table1").append(
          "<div class='row' id='" + albums[i].id + "' draggable='true' ondragstart='drag(event)'><div class='id-column'><p>" + albums[i].id + "</p></div><div class='title-column'><p>" + albums[i].title + "</p></div></div>")
        // candyStripe();
      } if (albums[i].userId === 2) {
        $(".table2").append(
          "<div class='row' id='" + albums[i].id + "' draggable='true' ondragstart='drag(event)'><div class='id-column'><p>"
           + albums[i].id +
           "</p></div><div class='title-column'><p>"
            + albums[i].title +
            "</p></div></div>")
        // candyStripe();
      }
    }

    drop_handler = function(ev){
      ev.preventDefault();
      var table = ev.currentTarget;
      var draggedRowId = ev.dataTransfer.getData("text");
      var draggedRow = document.getElementById(draggedRowId);
      var userId;
      if (table.id === "table1"){
        userId = 1;
      }else if(table.id === "table2"){
        userId = 2;
      }else{
        console.log('not found');
      }
      $.ajax('http://jsonplaceholder.typicode.com/albums/' + draggedRowId, {
        method: 'PATCH',
        data: {
          "userId": userId,
          "id": draggedRowId,
        }
      }).then(function(data) {
        console.log('success!!!');
        console.log(data);
          if (data.userId === 2) {
            console.log("#table1 .row#" + data.id)
            $("#table1 .row#" + data.id).remove();
            $(".table2").append(
            "<div class='row' id='" + data.id + "' draggable='true' ondragstart='drag(event)'><div class='id-column'><p>"
             + data.id +
             "</p></div><div class='title-column'><p>"
              + data.title +
              "</p></div></div>")
            // candyStripe();
          } else if (data.userId === 1) {
            $(".table1").append(
            "<div class='row' id='" + data.id + "' draggable='true' ondragstart='drag(event)'><div class='id-column'><p>" + data.id + "</p></div><div class='title-column'><p>" + data.title + "</p></div></div>")
          } else {
            console.log("error! Can't append for some reason")
          }

      });


    }

    allowdrop = function(ev){
      ev.preventDefault();
      console.log('allowdrop');

    }

    drag = function(ev){
      console.log('in drag');
      console.log('drag ev:');
      console.log(ev);
      ev.dataTransfer.setData("text", ev.target.id);

    };

  });
}

// var candyStripe = function(){
//   console.log("candy!")
//   $("div.row:odd").css("background-color", "#D9BA23");
// }


 ajaxCall();

}); //document.ready closing brackets
