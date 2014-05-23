var request = require('request');
var moment = require('moment');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  
  //----start of the code to get Ursuline Academy info, figure out how to put this into a dfferent file 
  //(http://scotch.io/tutorials/javascript/node-and-angular-to-do-app-application-organization-and-structure)

  var rss = "http://www.ursulineacademy.org/data/calendar/rsscache/page_357.rss"
  request(rss, function(error, response, xml) {
    if (!error && response.statusCode == 200) {
      while (xml.indexOf("<item>") != -1) {
        i1 = xml.indexOf("<item>")
        i2 = xml.indexOf("</item>")
        xml = xml.substring(i1, xml.length)
        t1 = xml.indexOf("<title>") + 7
        t2 = xml.indexOf("</title>")
        title = xml.substring(t1, t2)
        l1 = xml.indexOf("<link>") + 6
        l2 = xml.indexOf("</link>")
        link = xml.substring(l1, l2)
        d1 = xml.indexOf("<description>") + 13
        d2 = xml.indexOf("</description>")
        description = xml.substring(d1, d2)
        date1 = description.indexOf("Date: ") + 6
        date2 = description.indexOf("<br")
        date = description.substring(date1, date2)
        xml = xml.substring(d2+13, xml.length)

        //find the events for today's date only
        var ua_calendar_day = moment(date).toDate()
        console.log("ua_calendar_day: " + ua_calendar_day + "------" + ua_calendar_day.valueOf())
        var current_day = new Date()
        current_day.setHours(0)
        current_day.setMinutes(0)
        current_day.setSeconds(0)
        console.log("current_day: " + current_day + "-----" + current_day.valueOf())
        // if (ua_calendar_day.valueOf() == current_day.valueOf()) {
        //   console.log("TRUE!!!!!!")
        // }
      }
    }
  });

  res.render('index', { title: 'Express', ua_letter: 'A day', ua_date: 'aaa' });
};
