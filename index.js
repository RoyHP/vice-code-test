// The config package would be great for this :)
const port = 1337
// Node Core
const http = require('http')
// Module Deps (No NPM as requested, so I wrote my own)
const parser = require('./requestParser.js')
const Message = require('./message.js').TextMessage

// Keep track of our connected clients so we can broadcast to them
var clients = []
// Simply store the message objects in an array on the heap
const messages = []

const server = http.createServer((request, response) => {
	// Posting (and broadcasting) a new message
	if (request.method == 'POST' && request.url == '/message') {
		// Buffer up the request, throwing a 413 if it's too big
		var requestData = ''
		request.on('data', data => {
			requestData += data
			if (requestData.length > 1e5) {
				// Request Entity Too Large
				response.writeHead(413, {'Content-Type': 'text/plain'}).end()
                request.connection.destroy()
			}
		})
		// Once the request has completed, parse and create a new message
		// then broadcast it to all of our open sockets
		request.on('end', () => {
			let message = new Message(parser.parseRequest(requestData))
			// Store this new message object in our global list of messages
			messages.push(message)
			// Broadcast it to all of our connected clients
			clients.forEach(client => {
				client.write(JSON.stringify(message))
			})
			response.statusCode = 200
			response.end()
		})
	}
	else if (request.method == 'GET' && request.url == '/messages') {
		// Add this client's response object to the clients map and keep the socket open
		clients.push(response)
		// Start the headers
		response.writeHead(200, {'Content-Type': 'application/json'})
		// On a new connection, flush all of the messages we already have
		messages.forEach(message => {
			response.write(JSON.stringify(message))
		})
		// Now this connection will stay open until it times out
		// this is a naive way to implement this message broadcast feature
		// without using websockets, socket.io, WebRTC, etc.

		// Here is where I would add a listener for the end event of a response
		// and then remove the connected client from the list so we don't
		// try broadcasting to them in the future. That would involve converting
		// the connected clients array to a map and using UUID/Ephemeral identifiers
		// to keep track of the clients. I figured it was out of scope for this test.
	}
	else {
		// We didn't match any routes, so throw them a 404
		response.statusCode = 404
		response.statusMessage = 'Not found';
		response.end()
	}
})

// Throw them a 400 if there's a protocol issue
server.on('clientError', (error, socket) => {
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

// Start listening on our configured port (at the top)
server.listen(port)
console.log('Server is running on port: %s', port)
