'use strict';

const

	fs = require('fs'),
	net = require('net'),
	filename = process.argv[2],
	server = net.createServer( function(connection) {

		console.log('Subscriber connected');
	
		connection.write(JSON.stringify({
			type: 'watching',
			file: filename
		}) + '\n');

		let watcher = fs.watch(filename, function() {
			connection.write(JSON.stringify({
				type: 'changed',
				file: filename,
				timestamp: Date.now()
			}) + '\n' );
		});
	});

	if ( !filename ) {
		throw Error('No target filename was specified');
	}

	server.listen(5432, function() {
		console.log('Listening for subscribers...');
	});