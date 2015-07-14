$(document).ready(function() {
    setTimeout(function() {
        var currentRoom = '.' + $('#roomSelect').val();
        $(currentRoom).show()
    }, 1000);

    $('#submit').on('click', function(){
      var obj = {
        text: $('#input').val(),
        username: window.location.search.split('=')[1],
        roomname: $('#roomSelect').val()
      };

      if(obj.text){
        app.send(obj);
      }
    });

    $('select').on('change', function() {
        $('#chats').children().hide();
        var currentRoom = '.' + $('#roomSelect').val();
        $(currentRoom).show();
    });

});
