var app = {};
var ids = {};
var holder = {};

app.init = function() {
    var chatData = app.fetch();
    setTimeout(function() {
        chatData = chatData.responseJSON.results;
        console.log(chatData);
        for (var i = 0; i < chatData.length; i++) {
            holder[chatData[i].roomname] = chatData[i].roomname;
        }
        app.addRoom(holder);
        for (var i = chatData.length - 1; i >= 0; i--) {
            app.addMessage(chatData[i]);
        }

    }, 1000);


};
app.send = function(message) {
    $.ajax({
        type: 'POST',
        url: 'https://api.parse.com/1/classes/chatterbox',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(data) {
            console.log('chatterbox: Message sent');

        },
        error: function(data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message');
        }
    });
};
app.fetch = function() {
    return $.ajax({
        type: 'GET',
        url: 'https://api.parse.com/1/classes/chatterbox/',
        contentType: 'application/json',
        success: function(data) {
            console.log('Data retrieved')
                // console.log(data)
            return data;
        },
        error: function(data) {
            console.log('failed')
        }
    });



};
app.server = 'https://api.parse.com/1/classes/chatterbox/';

app.clearMessages = function() {
    $('#chats').empty();
}

app.addMessage = function(message) {
    if (!ids.hasOwnProperty(message.objectId)) {
        ids[message.objectId] = message.objectId;
        if ($('#roomSelect').val() === message.roomname) {
        
            var $divs = $("<div class='" + message.roomname + "'></div>");
        } else {
            var $divs = $("<div class='" + message.roomname + "'></div>").hide();
        }
        $divs.text(message.username + ': ' + message.text + "  ----  " + message.createdAt);
        $('#chats').prepend($divs);
    }
}

app.addRoom = function(room) {
    var arr = Array.prototype.slice.call($('#roomSelect').children());
    arr = arr.map(function(ind) {
        return ind.value
    });
    for (var key in room) {
        if (arr.indexOf(key) === -1) {
            $('#roomSelect').append('<option value="' + key + '">' + key + '</option>');
        }

    }
}
app.init();

setInterval(app.init, 200)
