var request = require('request');

const URL = "http://139.59.29.99"

var data = {
          "latitude" : "123" ,
          "longitude" : "123" ,
          "device" : 1
        }



var options = {
        uri: URL + '/api/?format=json',
        method: 'POST',
        json: data
      };
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the shortened url.                                                                                                                           
  }
});
