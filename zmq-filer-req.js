'use strict';
const
	zmq = require('zmq'),
	filename = process.argv[2],
	requester = zmq.socket('req');

	// create a request endpoint
	requester.on('message', function(data) {
		let response = JSON.parse(data);
		console.log('Received response:', response);
	});

	requester.connect('tcp://localhost:5433');

	// send request for content
	console.log('Sending request for ' + filename);
	requester.send(JSON.stringify({
		path: filename
	}));