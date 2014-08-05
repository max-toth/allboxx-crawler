var s;
var userId;
$(document).ready(function () {

    $("#message").keyup(function (e) {
        if (e.keyCode == 13) {
            send();
        }
    });

    try {
        s = new WebSocket("ws://10.0.102.53:8081/chat");
        s.onopen = function (e) {
            console.log("Socket opened.");
            if (getCookie("allboxx") != undefined) {
                userId = getCookie("allboxx");
                s.send("user:cookie:" + userId);
            } else {
                s.send("user:new:");
            }
            console.log();
        };

        s.onclose = function (e) {
            console.log("Socket closed.");
        };

        s.onmessage = function (e) {
            console.log("Socket message:", e.data);
            var div = document.createElement("div");
            div.innerHTML = e.data;
            var prefix = "Allboxx:";
            var prefix_cookie = "set:cookie:";

            if (e.data.substring(0, prefix_cookie.length) === prefix_cookie) {
                setCookie("allboxx", e.data.substring(prefix_cookie.length), 0x7FFFFFFF);
            } else if (e.data.substring(0, prefix.length) === prefix) {
                div.setAttribute("class", "message message--allboxx");
                $('#messages').append(div);
                var m = document.getElementById("messages");
                m.scrollTop = m.scrollHeight;
            } else {
                div.setAttribute("class", "message");
                $('#messages').append(div);
                var m = document.getElementById("messages");
                m.scrollTop = m.scrollHeight;
            }            
        };

        s.onerror = function (e) {
            console.log("Socket error:", e);
        };

    } catch (ex) {
        console.log("Socket exception:", ex);
    }
});

function send() {
    const message = $('#message');
    var msg = message.val();
    message.val('');
    if (msg != '')
        s.send(msg);
}

function setCookie(name, value, options) {

    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}


$("#message").keypress(function (event) {
    console.log(event);
    if (event.which == 13) {
        console.log(event);
        send();
    }
});


function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}