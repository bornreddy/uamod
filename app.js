
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var user = require('./routes/user');
 var http = require('http');
 var path = require('path');
 parse = require('jsonml').parse;
 

 var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

//goals: find which items match the date of today, find the letter day, and find the schedule 
var xml = ""
http.get("http://www.ursulineacademy.org/data/calendar/rsscache/page_357.rss", function(res) {
	console.log("Got response: " + res.statusCode);
	res.setEncoding('utf8');
	res.on('data',function(chunk) {
		xml += chunk
	});
	// res.on('end', function() {
 //        console.log(xml);
	// 	console.log(parse(xml));
 //    })

    res.on('end', function(){
    	//write a parser here
    })
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});
