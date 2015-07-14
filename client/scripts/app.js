
  var app = {};

  app.init = function() {
      var chatData = app.fetch();
      setTimeout(function(){
        chatData = chatData.responseJSON.results;
        console.log(chatData);
        for (var i = 0; i < chatData.length; i++) {
          app.addRoom(chatData[i].roomname);
          app.addMessage(chatData[i].text);
        };

      },1000);


  };
  app.send = function(message) {
      $.ajax({
          type: 'POST',
          url: 'https://api.parse.com/1/classes/chatterbox',
          data: JSON.stringify(message),

      });
  };
  app.fetch = function() {
      return $.ajax({
          type: 'GET',
          url: 'https://api.parse.com/1/classes/chatterbox/',
          contentType: 'application/json',
          success: function(data){
            console.log('Data retrieved')
            // console.log(data)
            return data;
          },
          error: function(data){
            console.log('failed')
          }
      });
    


  };
  app.server = 'https://api.parse.com/1/classes/chatterbox';

  app.clearMessages = function() {
      $('#chats').empty();
  }

  app.addMessage = function(message) {
    var $divs = $("<div></div>")
    $divs.text(message)

      $('#chats').append($divs);
  }

  app.addRoom = function(room) {
      $('#roomSelect').append('<option value="' + room + '">' + room + '</option>');
  }
  app.init();


