function initSoundcloud() {
  SC.initialize({
    client_id: 'be212a58528168962a39c64052c1d88e',
    redirect_uri: 'http://cel51.katagena.net/homepage/'
  });
  SC.connect(function() {
    SC.get('/me', function(me) {
    });
  });
  $('.terminal#sc').terminal({
  "load" : function(arg) {
    var term = this;

    if(arg == "favorites") {
      SC.get('/me/favorites', function(favorites){
        if(favorites.errors == null) {
          playlist = favorites;

          term.echo("\n");
          term.error("Load the favorites into current playlist");
          term.echo("\n");

          $(favorites).each(function(index, favorite) {
            term.echo(index + "\t\t\t" +favorite.title);
          });

          term.echo("\n");
        } else {
          term.echo("\n");
          term.error("Must login first, use command login");
          term.echo("\n");
        }
      });
    }
  },
  "currentplaylist": function() {
    var term = this;

    if(playlist != null) {
      term.echo("\n");
      term.error("Current playlist");
      term.echo("\n");

      $(playlist).each(function(index, track) {
        if(index == currentSong) {
            term.error(index + "\t\t\t" + track.title);
        } else {
          term.echo(index + "\t\t\t" + track.title);
        }
      });

      term.echo("\n");
    } else {
      term.echo("\n");
      term.error("You must load a playlist first");
      term.echo("\n");
    }
  },
  "currentsong": function() {
    var term = this;

    if(playlist != null) {
      term.echo("\n");
      term.error(playlist[currentSong].title+" is currently playing");
      term.echo("\n");
    } else {
      term.echo("\n");
      term.error("You must load a playlist first");
      term.echo("\n");
    }
  },
  "play" : function(arg) {
    var term = this;

    if(playlist != null) {
      if(arg != null) {
        if(arg > playlist.length-1) {
          arg = playlist.length-1;
        } else if (arg < 0) {
          arg = 0;
        }
        currentSong = arg;
      }

      if(player != null)
        player.pause();

      SC.stream('/tracks/'+playlist[currentSong].id ,function(playr){
        player = playr;
        term.echo("\n");
        term.error(playlist[currentSong].title+" is playing");
        term.echo("\n");
        player.play();
      });
    } else {
      term.echo("\n");
      term.error("No playlist loaded");
      term.echo("\n");
    }
  },
  "pause" : function() {
    var term = this;

    if(playlist != null) {
      term.echo("\n");
      term.error(playlist[currentSong].title+" is paused");
      term.echo("\n");
      player.pause();
    } else {
      term.echo("\n");
      term.error("No playlist loaded");
      term.echo("\n");
    }
  },
  "next": function() {
    var term = this;

    if(playlist != null) {
      if(currentSong == playlist.length-1) {
        currentSong = 0;
      } else {
        currentSong += 1;
      }

      player.pause();
      SC.stream('/tracks/'+playlist[currentSong].id ,function(playr){
        player = playr;
        term.echo("\n");
        term.error(playlist[currentSong].title+" is playing");
        term.echo("\n");
        player.play();
      });
    } else {
      term.echo("\n");
      term.error("No playlist loaded");
      term.echo("\n");
    }
  },
  "prev": function() {
    var term = this;

    if(playlist != null){
      if(currentSong == 0) {
        currentSong = playlist.length-1;
      } else {
        currentSong -= 1;
      }

      player.pause();
      SC.stream('/tracks/'+playlist[currentSong].id ,function(playr){
        player = playr;
        term.echo("\n");
        term.error(playlist[currentSong].title+" is playing");
        term.echo("\n");
        player.play();
      });
    } else {
      term.echo("\n");
      term.error("No playlist loaded");
      term.echo("\n");
    }
  },
  "quit" : function() {
    this.error("Must press CTRL+D to exit");
  },
  },  {
        greetings: 'Welcome ' + username,
        name: 'soundcloud',
        height: 0,
        prompt: username+'@soundcloud:~$ '
    }
  );
}
