console.log(' --- App Running');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
var fx = require('./functions');
var DB_options = {
  user: 'administrator',
  pass: 'asd@1234*'
}
mongoose.connect('mongodb://localhost:27017/admin', DB_options);


// DB
var User  = mongoose.model('User', {
										fullname: String,
										email: String,
										username: String,
										password: String,
										active: Boolean,
										activator: String,
										topics: Array,
										clients: Array
									});

// MQTT 
const client  = mqtt.connect('mqtt://5.9.176.185')
 
client.on('connect', function () {
  console.log(' --- MQTT Connected');	
  client.subscribe('app/#');
  /*client.publish('city/status', 'DB Handler is running!');*/
})

client.on('message', function (topic, message) {
  var topicObject = fx.topicObject(topic)
  console.log( (topicObject) ? topicObject : ' ---Request is not valid!' );
  console.log('Topic is: ',topic,' & Message is: ',message.toString());
  if (topicObject) {
  	var query  = User.where({ username: topicObject.username });
  	query.findOne()
  };
  
  /* Saving data */
/*  var cont = new User({ data: JSON.parse(message.toString()) });
	cont.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('Added To DB');
	  }
	});*/
  /*client.end()*/
})
	
