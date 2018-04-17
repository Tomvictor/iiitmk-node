var net = require('net');

var server = net.createServer(function(socket) {
	//listening event is not working
	socket.on('listening',() => {
		console.log('listening for connections');
	    });
	console.log("client connected"); //message on new connection
	console.log(socket.address()); //This will display the client address
	socket.write('iiitmk server\r\n'); //imediate message to client
	//tring to read the data
	socket.on('data',(data) => {
		//console.log("Data Recieved:");
		//console.log(data);
		//console.log("Data length:");
		//console.log(data.length);
		//console.log("Data in ascii");
		var dataString = data.toString('ascii');
		console.log(dataString);
		//returning acknowledge
		var flag; 
		flag = socket.write(dataString) ;
		//console.log(flag);
		
	    });
	socket.on('error',(err) => {
		console.log("Error occured");
		console.log(err);
	    });

	//socket.pipe(socket);

	//message on disconnecting client
	socket.on('end', () => {
		console.log('client disconnected');
	    });
    });

server.listen(8800, '0.0');