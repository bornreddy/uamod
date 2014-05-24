//go through and clean up code after! 
var request = require('request');
var moment = require('moment');
var jsdom = require('jsdom');
var window = jsdom.jsdom().createWindow();
var $ = require('jquery')(window);
var sched = require('sched');



function sec_to_time(x) {
  if (x > 86400) {
    console.log("false input time, exceeds 24 hours")
    return [0]
  }
  var hours = Math.floor(x/3600)
  var y = x % 3600
  var minutes = Math.floor(y/60) 
  var seconds = y % 60
  var time_array = [hours,minutes,seconds]
  return time_array
}

function time_to_sec(h,m,s) {
  var seconds = 0
  seconds += (h*3600) + (m*60) + (s)
  return seconds
}

exports.index = function(req, res) {
  //is this the best place for this list? 
  var today_events = []
  var rss = "http://www.ursulineacademy.org/data/calendar/rsscache/page_357.rss"
  request(rss, function(error, response, xml) {
    var current_day = new Date()
    if (!error && response.statusCode == 200) {
      var current_day = new Date()
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
        //find the titles for today's dates
        var ua_calendar_day = moment(date).toDate()


        if (ua_calendar_day.getFullYear() == current_day.getFullYear()) {
          if (ua_calendar_day.getMonth() == current_day.getMonth()) {
            if (ua_calendar_day.getDate() == current_day.getDate()) {
              console.log("same day")
              // console.log("current_day: " + current_day + "ua_calendar_day: " + ua_calendar_day)
              today_events.push(title)
            }
          }
        }
      }
      prettyDate = moment(current_day).format('MMMM Do YYYY')
      prettyTime = moment().format('h:mm:ss a')
      letterDay = ""
      schedule = ""

      //check to see what letter day it is (if a letter day)
      switch (today_events[0]) {
      case "A Day":
        letterDay = "A Day";
        break;
      case "B Day":
        letterDay = "B Day";
        break;
      case "C Day":
        letterDay = "C Day";
        break;
      case "D Day":
        letterDay = "D Day";
        break;
      case "E Day":
        letterDay = "E Day";
        break;
      case "F Day":
        letterDay = "F Day";
        break;
      default:
        letterDay = "Today has no letter day." 
      }
      //check to see what schedule it is, and find the right mod
      if (today_events.length = 1) {
        schedule = "not modular today."
      }

      for (var i = 1; i < today_events.length; i++) { 
        console.log("checking")
        if (today_events[i].indexOf("Homeroom 1") != -1) {
          schedule = "Homeroom 1"
        } else if (today_events.indexOf("Homeroom 2") != -1) {
          schedule = "Homeroom 2"
        } else if (today_events.indexOf("Activity 1") != -1) {
          schedule = "Activity 1"
        } else if (today_events.indexOf("Activity 2") != -1) {
          schedule = "Activity 2"
        } else if (today_events.indexOf("Activity 3") != -1) {
          schedule = "Activity 3"
        } else if (today_events.indexOf("Activity 4") != -1) {
          schedule = "Activity 4"
        } else if (today_events.indexOf("Activity 5") != -1) {
          schedule = "Activity 5"
        } else if (today_events.indexOf("Activity 6") != -1) {
          schedule = "Activity 6"
        } else if (today_events.indexOf("Activity 7") != -1) {
          schedule = "Activity 7"
        } else if (today_events.indexOf("Activity 8") != -1) {
          schedule = "Activity 8"
        } else if (today_events.indexOf("Activity 9") != -1) {
          schedule = "Activity 9"
        } else {
          schedule = "normal."

        }
      }

      console.log(sec_to_time(500))
      console.log(time_to_sec(0,8,20))

      res.render('index', { 
        title: 'UA Mod', 
        ua_letter: letterDay, 
        date: prettyDate, 
        time: prettyTime,
        ua_schedule: schedule
      });
      
    }
  });


};
