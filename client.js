var net = require('net');

var client = new net.Socket();
client.connect(8800, '139.59.29.99', function() {
	console.log('Connected');


	var data = {
		"latitude" : "1234" ,
		"longitude" : "1234" ,
		"device" : 1
	}
	client.write(data);
    });

client.on('data', function(data) {
	console.log('Received: ' + data);
	//client.destroy(); // kill client after server's response
    });

client.on('close', function() {
	console.log('Connection closed');
    });