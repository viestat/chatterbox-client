var app = {};

app.init = function() {
    var chatData = app.fetch();
    setTimeout(function() {
        chatData = chatData.responseJSON.results;
        console.log(chatData);
        var holder = {};
        for (var i = 0; i < chatData.length; i++) {
            holder[chatData[i].roomname] = chatData[i].roomname;
            app.addMessage(chatData[i]);
        }
        app.addRoom(holder);

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
app.server = 'https://api.parse.com/1/classes/chatterbox';

app.clearMessages = function() {
    $('#chats').empty();
}

app.addMessage = function(message) {
    var $divs = $("<div class='" + message.roomname + "'></div>").hide();
    $divs.text(message.username + ': ' + message.text + "  ----  " + message.createdAt);


    $('#chats').append($divs);
}

app.addRoom = function(room) {
    for (var key in room) {
        $('#roomSelect').append('<option value="' + key + '">' + key + '</option>');

    }
}
app.init();
