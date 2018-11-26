var mqtt = require('mqtt');
var cloudMQTTUrl = 'mqtt://senfdtah:QFMngZSY4SL1@m15.cloudmqtt.com:18724';
//var client  = mqtt.connect('mqtt://senfdtah:QFMngZSY4SL1@m15.cloudmqtt.com:18724');
var client;
var deviceId;
var nord;
var sud;
var est;
var ouest;
var etat =1;
var datetime;
// client.on('connect', function () {
// 	console.log('client connected');
//     client.publish('myhome', 'Hello from publisher');
// 	});

require('getmac').getMac(function(err, macAddress){
	if (err) throw err;
	deviceId = macAddress;
	console.log(deviceId);
	client = mqtt.connect(cloudMQTTUrl,
	{
	clientId: deviceId,
	will: {
	topic: 'street/server/will',
	payload: deviceId
	},
	keepalive: 60
	});
   
	client.on('connect', function () {
	message = JSON.stringify({
		streetId:deviceId,
		north : "orange",
		est : "rouge",
		ouest : "rouge",
		sud : "orange",
		date : new Date()
	});
	client.publish('street/server', message);
	});
	
	function handlingEtat(){
		
		if(etat == 1){
			nord = "rouge";
			sud = "rouge";
			est = "vert";
			ouest = "vert";
		} else if(etat == 2) {
			nord = "rouge";
			sud = "rouge";
			est = "orange";
			ouest = "orange";
		} else if(etat == 3) {
			nord = "vert";
			sud = "vert";
			est = "rouge";
			ouest = "rouge";
		} else if (etat == 4) {
			nord = "orange";
			sud = "orange";
			est = "rouge";
			ouest = "rouge";
			etat = 0;
		}
		console.log('Etat : ',etat,' Nord : ', nord, ' sud : ', sud,' est : ', est,' ouest : ', ouest);
		etat++;
	}
	setInterval(function(){
	//datetime = new Date();

	
	handlingEtat();

	message = JSON.stringify({
	streetId:deviceId,	
	});
	client.publish('street/streetId', message);

	message = JSON.stringify({
	north:nord,	
	});
	client.publish('street/north', message);

	message = JSON.stringify({
	sud:sud,	
	});
	client.publish('street/sud', message);
	
	message = JSON.stringify({
	est:est,	
	});
	client.publish('street/est', message);

	message = JSON.stringify({
	ouest:ouest,	
	});
	client.publish('street/ouest', message);
	

}, 15000);
   });