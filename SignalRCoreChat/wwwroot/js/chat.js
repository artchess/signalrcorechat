"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl('/chathub').build();
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var encodedMsg = user + " says: " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById('messagesList').appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (error) {
    return console.error(error.toString());
});

document.getElementById("sendButton").addEventListener('click', function (event) {
    var user = document.getElementById('userInput').value;
    var message = document.getElementById('messageInput').value;

    connection.invoke('SendMessage', user, message).catch(function (error) {
        return console.error(error.toString());
    });

    event.preventDefault();
});