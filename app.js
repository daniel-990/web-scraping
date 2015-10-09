var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

//comunicacion con el servidor local por el puerto 8080;

var puerto = 8080;

server.listen(puerto, function(error){
	if (error){
		console.log(error);
	}else{
		console.log("se conecto al puerto / localhost: " + puerto);
	};
});

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
	});

	request({url: 'http://nodebit.tumblr.com/'}, function(err, resp, body){
		if(!err && resp.statusCode == 200){
           var $ = cheerio.load(body);
           $("#container #textos .font").each(function(){
	           var titulo = $(this).html();
	           console.log(titulo);

	           //----
	           io.sockets.on('connection', function(socket){
	           	socket.on('enviar dato', function(datoWeb){
	           		datoWeb = titulo;
	           		io.sockets.emit('nuevo dato', datoWeb);
	           	})
	           })
	           //----

           });
          }
	});


