var api = require('./api');

exports.index = function(req, res) {
  api.update(function(json) {

    res.render('index', json); 
  });

}
