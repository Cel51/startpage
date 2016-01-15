function initSoundcloud() {  
  SC.connect(function() {
    SC.get('/me', function(me) {
      console.log(me);
      term.echo("Welcome "+ me.username);
    });
  });
}
