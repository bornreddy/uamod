exports.index = function(req, res) {
  res.render('index', { 
    title: 'UA Mod', 
    ua_letter: 'nada', 
    date: 'nada', 
    time: 'nada',
    ua_schedule: 'nada',
    current_mod: 'nada',
    next_mod: 'nada'
  }); 
}