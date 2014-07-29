# -*- coding: utf-8 -*-
import socket, struct, hashlib, threading, cgi, base64

guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

def accept(key):
	key = key + guid
	sha = hashlib.sha1(key.encode("utf-8"))
	key = sha.digest()
	return base64.b64encode(key)
 
def recv_data (client, length):
	data = client.recv(length)
	print("data recv: ", data)
	if not data: return data
	return data.decode('utf-8', 'ignore')
 
def send_data (client, data):
	message = "\x00%s\xFF" % data.encode('utf-8')
	return client.send(message.encode("utf-8"))
 
def parse_headers (data):
	headers = {}
	lines = data.splitlines()
	for l in lines:
		parts = l.decode("utf-8").split(": ", 1)
		if len(parts) == 2:
			headers[parts[0]] = parts[1]
	headers['code'] = lines[len(lines) - 1]
	return headers
 
def handshake (client):
	print('Handshaking...')
	data = client.recv(1024)
	headers = parse_headers(data)
	print('Got headers:')
	for k, v in headers.items():
		print(k, ':', v)
	digest = accept(headers['Sec-WebSocket-Key'])
	shake = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n"
	shake += "Upgrade: WebSocket\r\n"
	shake += "Connection: Upgrade\r\n"
	shake += "Sec-WebSocket-Origin: %s\r\n" % (headers['Origin'])
	shake += "Sec-WebSocket-Location: ws://%s/chat\r\n" % (headers['Host'])
	shake += "Sec-WebSocket-Accept: " + digest.decode("utf-8") + "\r\n\r\n"
	return client.send(shake.encode("utf-8"))
 
def handle (client, addr):
	handshake(client)
	lock = threading.Lock()
	while 1:
		data = recv_data(client, 1024)
		if not data: break
		data = cgi.escape(data)
		lock.acquire()
		[send_data(c, data) for c in clients]
		lock.release()
	print('Client closed:', addr)
	lock.acquire()
	clients.remove(client)
	lock.release()
	client.close()

def start_server ():
	s = socket.socket()
	s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
	s.bind(('', 9876))
	s.listen(5)
	while 1:
		conn, addr = s.accept()
		print('Connection from:', addr)
		clients.append(conn)
		threading.Thread(target = handle, args = (conn, addr)).start()
 
clients = []
start_server()