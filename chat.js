var s;

$(document).ready(function(){
	try{	
		s = new WebSocket("ws://10.0.102.53:8081/chat");	
		s.onopen = function (e) {
			console.log("Socket opened.");
		};
			
		s.onclose = function (e) {
			console.log("Socket closed.");
		};
				
		s.onmessage = function (e) {
			console.log("Socket message:", e.data);
			var p = document.createElement("p");
			p.innerHTML = e.data;
			$('#messages').append(p);
		};
				
		s.onerror = function (e) {
			console.log("Socket error:", e);
		};
			
		} catch (ex) {
			console.log("Socket exception:", ex);
		}			
});

function send() {
	var msg = $('#message').val();
	$('#message').val('');
	s.send(msg);	
}
