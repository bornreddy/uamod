exports.api = function(req, res) {
	res.send({ 
		title: 'UA Mod', 
		ua_letter: letterDay, 
		date: prettyDate, 
		time: prettyTime,
		ua_schedule: schedule,
		current_mod: current_mod,
		next_mod: next_mod
	}); 
}