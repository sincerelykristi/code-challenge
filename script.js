// HTML5 drag and drop functions, called globally to get access to data
var drop_handler;


var allowdrop = function(ev) {
    ev.preventDefault();
}

var drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};


$(document).ready(function() {
    console.log("all systems go!");


    // First AJAX request to get User name for user id:1 and user id: 2. Append to DOM.
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET'
    }).then(function(users) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === 1) {
                $(".user1").text(users[i].name);
                i++
            }
            if (users[i].id === 2) {
                $(".user2").text(users[i].name);
            }
        };
    });

    // construct html for table given albums and id
    function tableText(id, title) {
        return (
            "<div class='row' id='" + id + "' draggable='true' ondragstart='drag(event)'><div class='id-column'><p>" + id + "</p></div><div class='title-column'><p>" + title + "</p></div></div>"
        );
    }

    // Second AJAX request to get albums with userId:1 and userId:2. Append to DOM
    var ajaxCall = function() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/albums',
            method: 'GET'
        }).then(function(albums) {

            for (var i = 0; i < albums.length; i++) {
                if (albums[i].userId === 1) {
                    $(".table1").append(
                        tableText(albums[i].id, albums[i].title));
                } else if (albums[i].userId === 2) {
                    $(".table2").append(
                        tableText(albums[i].id, albums[i].title));
                }
            }

            drop_handler = function(ev) {
                ev.preventDefault();
                var table = ev.currentTarget;
                var draggedRowId = ev.dataTransfer.getData("text");
                var draggedRow = document.getElementById(draggedRowId);
                var userId;
                if (table.id === "table1") {
                    userId = 1;
                } else if (table.id === "table2") {
                    userId = 2;
                } else {
                    console.log('not found');
                }
                $.ajax('http://jsonplaceholder.typicode.com/albums/' + draggedRowId, {
                    method: 'PATCH',
                    data: {
                        "userId": userId,
                        "id": draggedRowId,
                    }
                }).then(function(data) {

                    if (data.userId === 2) {
                        $("#table1 .row#" + data.id).remove();
                        $(".table2").append(
                            tableText(data.id, data.title))
                    } else if (data.userId === 1) {
                        $("#table2 .row#" + data.id).remove();
                        $(".table1").append(
                            tableText(data.id, data.title))
                    }
                });


            }



        });
    }

    ajaxCall();

}); //document.ready closing brackets
