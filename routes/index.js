var request = require('request');

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
    }
  });

  res.render('index', { title: 'Express' });
};
