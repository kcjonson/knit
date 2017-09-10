
// Constants
var DEVICE_ID = "1234";
var WIFI_NAME = "*****";
var WIFI_OPTIONS = {
  password : "*******"
};
var KNIT_ADDRESS = '*******';
var KNIT_PORT = 3000;



// Connect to Sensor
var ow = new OneWire(A0);
var sensor;
console.log('Connecting to sensor');
try {
  sensor = require("DS18B20").connect(ow);
} catch (e) {
  console.log('Unable to connect to sensor \n', e);
}

// Connect to Wifi
console.log('Starting Wifi connection');
var wifi = require("EspruinoWiFi");
wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
  if (err) {
    console.log("Wifi Connection error: "+err);
    return;
  }
  console.log("Connected!");
  start();
});

var http;
function start() {
  http = require('http');
  if (sensor) {
    getTemp();
    //setInterval(getTemp, 60000);
  } else {
    // TODO: Report failure to somewhere
  }
}

function getTemp() {
  sensor.getTemp(function (temp) {
    //console.log("Temp is "+temp+"°C");
    sendTemp(temp);
  });
}

function sendTemp(temp) {

  var postData = {
   value: {
     temperature: temp,
     unit: 'celsius'
   },
  };

  var req = http.request({
    host: KNIT_ADDRESS,
    port: KNIT_PORT,
    path: '/api/devices/'+ DEVICE_ID,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }, function(res) {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', function(data) {
      console.log("HTTP> "+data);
    });
    res.on('close', function(data) {
      console.log("Connection closed");
    });
  });
  req.on('error', function(e) {
    console.log(`ERROR: problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
}
