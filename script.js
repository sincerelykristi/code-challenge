// var drop_handler = function(ev){
//   ev.preventDefault();
//   console.log('hitting drop_handler');
// };

// var allowdrop = function(ev){
//   ev.preventDefault();
//   console.log('hitting allowdrop');
// }

var drop_handler;
var allowdrop;

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
          "<div class='row' draggable='true'><div class='id-column'><p>" + albums[i].id + "</p></div><div class='title-column'><p>" + albums[i].title + "</p></div></div>")
      } if (albums[i].userId === 2) {
        $(".table2").append(
          "<div class='row' draggable='true' ondragstart=''><div class='id-column'><p>"
           + albums[i].id +
           "</p></div><div class='title-column'><p>"
            + albums[i].title +
            "</p></div></div>")
        $("div.row:odd").css("background-color", "#D9BA23");
      }
    }

    var tableId = "";
    var currentTable = "";
    var currentAlbum = "";

    var tableMouseOver = function(){
      $(".table").mouseover(function(){
        tableId = $(this).attr("id");
        console.log(tableId + "Mouse Over!")
       })
    };

    tableMouseOver();

    var getAlbumInfo = function(){
      $("div.row").mousedown(function(){
        console.log("MouseDown!");
        currentTable = $(this).parent().attr("id");
        currentAlbum = $(this.firstChild.innerHTML).text();
        console.log(currentTable);
        console.log(currentAlbum);
        // tableMouseOver();
      })
    }

    getAlbumInfo();

    drop_handler = function(ev){
      ev.preventDefault();
      console.log('drop_hanlder');
    }

    allowdrop = function(ev){
      ev.preventDefault();
      console.log('allowdrop');
    }

    // function drop_handler(ev) {
    // console.log("Drop");
    // }

    // $("div.row").mousedown(function(){
    //   console.log("MouseDown!");
    //   currentTable = $(this).parent().attr("id");
    //   currentAlbum = $(this.firstChild.innerHTML).text();
    //   console.log(currentTable);
    //   console.log(currentAlbum);
    //   // $("table").mouseover(function(){
    //   //   var tableId = $(this).parent().attr("id");
    //   //   console.log(tableId + "Mouse Over!")
    //   //  })//.mouseup(function(){
    //   //   $ajax.
    //   // })// onMouseUp POST.then(ajaxCall())

    // })
  });
}





 ajaxCall();

}); //document.ready closing brackets
