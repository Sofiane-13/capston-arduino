// var Arrow = require('arrow');

// var client;

// module.exports.mqttInit = function() {
// 	var mqtt = require('mqtt');
// 	var mqtturl = 'mqtt://senfdtah:QFMngZSY4SL1@m15.cloudmqtt.com:18724';
// 	client = mqtt.connect(mqtturl);
	
// 	client.on('connect', function () {
// 		console.log('app.js - client connected');
// 		client.subscribe('myhome/server/#');
// 	});
	
// 	client.on('message', function (topic, message) {
// 		console.log('app.js - message received');
// 		handleMessage(topic, message);
// 	});
// };

// var handleMessage = function(topic, message) {
// 	console.log("apibmqttutils.js - processMessage() - topic = "+topic+" message = "+message);
    
//     switch(topic) {
//     	case 'myhome/server':
//     		processMessage(message);
//     		break;
    	
//     	case 'myhome/server/will':
//     		processLWTMessage(message);
//     		break;
    	
//     	default: unhandledTopic(topic, message);
//     }
// };

// var unhandledTopic = function(topic, message) {
// 	console.log('apibmqttutils.js - unhandledTopic() - Unhandled Topic: '+topic);
// };

// var getDevice = function(deviceId, callback) {
// 	console.log("apibmqttutils.js - getDevice() - deviceId = "+deviceId);
	
// 	var model = Arrow.getModel("device");
//     model.query({deviceId: deviceId}, function(err, data){
//   		if(err) {
//   			console.log('apibmqttutils.js - getDevice() - error accessing iot device database, err = '+err);
//   			if(callback) {callback(null)};
//   		} else {
//   			console.log('apibmqttutils.js - getDevice() - data.length = '+data.length);
//   			console.log('apibmqttutils.js - getDevice() - data = '+JSON.stringify(data));
//   			if(callback) {callback(data)};
//   		}
//   	});
// };

// var processLWTMessage = function(message){
// 	console.log("apibmqttutils.js - processLWTMessage() - message = "+message);
	
// 	getDevice(message.toString(), function(data){
// 		if(data) {
// 			if(data.length === 1) {
// 				data[0].isConnected = false;
// 				data[0].update();
// 			} else {
// 				console.log('apibmqttutils.js - processLWTMessage() - error with iot device, exactly 1 device not found');
// 			}
// 		} else {
// 			console.log('apibmqttutils.js - processLWTMessage() - error getting iot device');
// 		}
// 	});
// };

// var processMessage = function(message, callback) {
// 	console.log("apibmqttutils.js - processMessage() - message = "+message);
	
// 	message = JSON.parse(message);
	
// 	getDevice(message.deviceId, function(data){
// 		if(data) {
// 			console.log('apibmqttutils.js - processMessage() - data.length = '+data.length);
//   			console.log('apibmqttutils.js - processMessage() - data = '+JSON.stringify(data));
// 			if(data.length > 1) {
//   				console.log('apibmqttutils.js - processMessage() - Number of matching records greater than 1. Multiple devices with same deviceId present in device DB');
//   			} else {
//   				if(data.length === 1) {
//   					console.log('apibmqttutils.js - processMessage() - Number of matching records equals to 1');
// 			        data[0].isConnected = true;
// 			        data[0].temp = message.temp.toString();
// 			        data[0].update();
// 			        console.log('apibmqttutils.js - processMessage() - Record updated!!!');
//   				} else {
//   					console.log('apibmqttutils.js - processMessage() - No matching records found, create new device record');
//   				}
//   			}
// 		} else {
// 			console.log('apibmqttutils.js - processMessage() - error getting iot device');
// 		}
// 	});
// };