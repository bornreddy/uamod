var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

/*
 * POST update.
 */

exports.update = function(req, res){
    execFile("./update.sh", function(err, stdout, stderr) {
	res.send('err: '+err+', output: '+stdout+', stderr: '+stderr);
    });
};
