
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var user = require('./routes/user');
 var http = require('http');
 var path = require('path');
 parse = require('jsonml').parse;
 var moment = require('moment');

 

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


//----start of the code to get Ursuline Academy info, figure out how to put this into a dfferent file 
//(http://scotch.io/tutorials/javascript/node-and-angular-to-do-app-application-organization-and-structure)


//goals: find which items match the date of today, find the letter day, and find the schedule
var xml = ""
http.get("http://www.ursulineacademy.org/data/calendar/rsscache/page_357.rss", function(res) {
	console.log("Got response: " + res.statusCode);
	res.setEncoding('utf8');
	res.on('data',function(chunk) {
		xml += chunk
	});
	/*res.on('end', function() {
        console.log(xml);
		console.log(parse(xml));
    })*/
    res.on('end', function(){
      while (xml.indexOf("<item>") != -1) {
      	i1 = xml.indexOf("<item>")
      	i2 = xml.indexOf("</item>")
      	xml = xml.substring(i1, xml.length)
      	
      	t1 = xml.indexOf("<title>") + 7
      	t2 = xml.indexOf("</title>")
      	title = xml.substring(t1, t2)
      	// console.log("title: " + title)
      	// xml = xml.substring(t2+7, xml.length)
      	l1 = xml.indexOf("<link>") + 6
      	l2 = xml.indexOf("</link>")
      	link = xml.substring(l1, l2)
      	// console.log("link: " + link)
      	// xml = xml.substring(l2+6, xml.length)
      	d1 = xml.indexOf("<description>") + 13
      	d2 = xml.indexOf("</description>")
      	description = xml.substring(d1, d2)
      	console.log("description: " + description)
      	xml = xml.substring(d2+13, xml.length)

      }
    })
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});
