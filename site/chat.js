var s;

$(document).ready(function(){
	try{	
		s = new WebSocket("ws://192.168.1.9:8081/chat");
		s.onopen = function (e) {
			console.log("Socket opened.");
		};
			
		s.onclose = function (e) {
			console.log("Socket closed.");
		};
				
		s.onmessage = function (e) {			
			console.log("Socket message:", e.data);
			var div = document.createElement("div");
			div.innerHTML = e.data;
			var prefix = "Allboxx";
			if (e.data.substring(0, prefix.length) === prefix) {
				div.setAttribute("class","message message--allboxx");	
			} else {
				div.setAttribute("class","message");	
			}
			
			$('#messages').append(div);
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
	if (msg != '') {};
	s.send(msg);	
}

$( "#message" ).keypress(function(event) {
	console.log(event);
  	if ( event.which == 13 ) {
  	console.log(event);
  	send();
  }
});
