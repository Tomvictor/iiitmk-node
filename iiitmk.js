var net = require('net');
var request = require('request');

const URL = "http://139.59.29.99"


// {
// "latitude" : "123" ,
// "longitude" : "123" ,
// "device" : 1
// }


var server = net.createServer(function (socket) {
    //listening event is not working
    socket.on('listening', () => {
        console.log('listening for connections');
    });
    console.log("client connected"); //message on new connection
    console.log(socket.address()); //This will display the client address
    socket.write('$ready'); //imediate message to client
    //tring to read the data
    socket.on('data', (data) => {
        //console.log("Data Recieved:");
        //console.log(data);
        //console.log("Data length:");
        //console.log(data.length);
        //console.log("Data in ascii");
        var dataString = data.toString('ascii');
        console.log("recieved data . . . ")
        console.log(dataString);
        //returning acknowledge
        var data;

        try {
            jsonObj = JSON.parse(dataString);

            if (jsonObj.switch) {
                data = {
                    "latitude": jsonObj.latitude,
                    "longitude": jsonObj.longitude,
                    "device": jsonObj.deviceid
                }
                var options = {
                    uri: URL + '/api/?format=json',
                    method: 'POST',
                    json: data
                };

                console.log("sending api request...");


                console.log(options);

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body) // Print the shortened url.                                                                                                                           
                    }
                });

            }


        } catch (err) {

            console.log("error on json parsing");
            console.log(err);

        }


        var flag;
        flag = socket.write("ok");
        //console.log(flag);

    });
    socket.on('error', (err) => {
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