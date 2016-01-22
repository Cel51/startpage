var tlLoading, tlDisplay;
var username = "Cel51"
var cffT, mainT, scT;
var scPlayer = null;
var scMe = null;
var scCurr = null;

function init() {

  $("body").backstretch("images/"+images[Math.round(Math.random()*(images.length-1))],{fade: 300});

  $(".left-pannel, .mid-pannel, .right-pannel").mCustomScrollbar({
    scrollInertia: 100
  });

  initGreetings();
  initWeather();
  initTimeLines();
  initTerminal();
  initSearch();
  initFavorites();
  initSize();

  tlLoading.play();

  $("img").on('load',function() {
    tlLoading.pause();
    tlDisplay.play();
  })
  // setTimeout(function() {
  //
  // }, 1210);
}
function initTerminal() {
  mainT = $('.terminal-term.main #main').terminal({
    "f": function(arg1) {
      for(var i = 0; i < favorites.length; i++) {
        for(var j = 0; j < favorites[i][1].length; j++) {
          if(arg1 == favorites[i][1][j][2]) {
            var win = window.open(favorites[i][1][j][1], '_blank');
            win.focus();
          }
        }
      }
    },
    "cff": {
      "travel" :function(fromLocation, toLocation, date, time) {

        var term = this;

        if(date==undefined) date = cffDate();
        if(time==undefined) time = cffTime();

        $.get("http://transport.opendata.ch/v1/connections?from="+fromLocation+"&to="+toLocation+"&date="+date+"&time="+time,
        function(data) {
          createCFFdata(data);
        });
      },
      "help": function() {
        this.echo("\n");
        this.error("connections <from> <to>"); this.echo("display the train informations"); this.echo("\n");
        this.echo("\n");
      },
      "reset": function() {
        new TimelineMax({onComplete: function() {$(".informations.cff").remove();}})
        .to($(".informations.cff"), .2 ,{
          height: 0,
          autoAlpha: 0
        })
        .timeScale(.5);
      },
      "help": function() {
        this.echo("\n");
        this.error("travel"); this.echo("access the travel"); this.echo("\n");
        this.error("reset"); this.echo("clean the cff informations"); this.echo("\n");
        this.error("main"); this.echo("goto main terminal"); this.echo("\n");
        this.error("sc"); this.echo("goto soundcloud terminal"); this.echo("\n");
        this.error("cff"); this.echo("goto cff terminal"); this.echo("\n");
        this.echo("\n");
      }
    },
    "sc": {
      "login" : function() {
        scPlayer = new SoundCloudAudio(clientid);

        SC.initialize({
          client_id: clientid,
          redirect_uri: redirecturi
        });
        SC.connect(function() {
          SC.get('/me', function(me) {
            scMe = me;
          });
        });
      },
      "load" : {
        "likes": function() {
          var term = this;

          scPlayer.resolve('https://soundcloud.com/'+scMe.permalink+'/likes', function (playlist, err) {
            scPlayer.play({playlistIndex: 0});
            scPlayer.pause();
            scPlayer.on('ended', function () {
              if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
                scPlayer.play({playlistIndex: 0})
              else
                scPlayer.next();
            });
          });

          term.echo("\n");
          term.error("Call currentplaylist to see the loaded plalist");
          term.echo("\n");
        },
        "tracks": function() {
          var term = this;

          scPlayer.resolve('https://soundcloud.com/'+scMe.permalink+'/tracks', function (playlist, err) {
            scPlayer.play({playlistIndex: 0});
            scPlayer.pause();
            scPlayer.on('ended', function () {
              if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
                scPlayer.play({playlistIndex: 0})
              else
                scPlayer.next();
            });
          });

          term.echo("\n");
          term.error("Call currentplaylist to see the loaded plalist");
          term.echo("\n");
        },
        "playlist": function(playlist) {
          var term = this;
          scPlayer.resolve('https://soundcloud.com/'+scMe.permalink+'/sets/'+playlist, function (playlist, err) {
            scPlayer.play({playlistIndex: 0});
            scPlayer.pause();
            scPlayer.on('ended', function () {
              if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
                scPlayer.play({playlistIndex: 0})
              else
                scPlayer.next();
            });
          });

          term.echo("\n");
          term.error("Call currentplaylist to see the loaded plalist");
          term.echo("\n");
        },
        "user": function(username, mod, playlist) {
          var term = this;

          if(mod == 'playlist') {
            scPlayer.resolve('https://soundcloud.com/'+username+'/sets/'+playlist, function (playlist, err) {
              scPlayer.play({playlistIndex: 0});
              scPlayer.pause();
              scPlayer.on('ended', function () {
                if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
                  scPlayer.play({playlistIndex: 0})
                else
                  scPlayer.next();
              });
            });
          } else if (mod == 'likes') {
            scPlayer.resolve('https://soundcloud.com/'+username+'/likes', function (playlist, err) {
              scPlayer.play({playlistIndex: 0});
              scPlayer.pause();
              scPlayer.on('ended', function () {
                if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
                  scPlayer.play({playlistIndex: 0})
                else
                  scPlayer.next();
              });
            });
          } else {
            scPlayer.resolve('https://soundcloud.com/'+username+'/tracks', function (playlist, err) {
              scPlayer.play({playlistIndex: 0});
              scPlayer.pause();
              scPlayer.on('ended', function () {
                if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
                  scPlayer.play({playlistIndex: 0})
                else
                  scPlayer.next();
              });
            });
          }

          term.echo("\n");
          term.error("Call currentplaylist to see the loaded plalist");
          term.echo("\n");
        },
        "help" : function() {
          this.echo("\n");
          this.error("likes"); this.echo("load your account favorites"); this.echo("\n");
          this.error("tracks"); this.echo("load your account tracks"); this.echo("\n");
          this.error("playlist <name of the playlist>"); this.echo("load one of your playlist"); this.echo("\n");
          this.error("user <username>"); this.echo("load the user's tracks"); this.echo("\n");
          this.error("user <username> likes"); this.echo("load the user's favorites"); this.echo("\n");
          this.error("user <username> playlist <name of the playlist>"); this.echo("load one of the user's playlist");this.echo("\n");
          this.echo("\n");
          this.error("main"); this.echo("goto main terminal"); this.echo("\n");
          this.error("sc"); this.echo("goto soundcloud terminal"); this.echo("\n");
          this.error("cff"); this.echo("goto cff terminal"); this.echo("\n");
          this.echo("\n");
          this.echo("to quit the load function press CTRL+D");
          this.echo("\n");
        }
      },
      "currentplaylist": function() {
        var term = this;

        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        }
        else {
          term.echo("\n");
          $(scPlayer._playlist.tracks).each(function(index, track) {
            if(scPlayer._playlistIndex == index)
              term.error(index + "\t\t" + track.title);
            else
              term.echo(index + "\t\t" + track.title);
          });
          term.echo("\n");
        }
      },
      "currentsong": function() {
        var term = this;

        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        }
        else {
          term.echo("\n");
          term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
          term.echo("\n");
        }
      },
      "play" : function(arg) {
        var term = this;

        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        }
        else {
          term.echo("\n");

          if(arg != null) {
            scPlayer.play({playlistIndex: arg});
            term.error(arg + "\t\t" + scPlayer._playlist.tracks[arg].title + " is playing");
          }
          else {
            scPlayer.play();
            console.log(scPlayer);
            term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
          }

          scCurr = scPlayer._playlistIndex;
          term.echo("\n");
        }
      },
      "pause" : function() {
        var term = this;

        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        }
        else {
          scPlayer.pause();
          term.echo("\n");
          term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is paused");
          scCurr = scPlayer._playlistIndex;
          term.echo("\n");
        }
      },
      "resume": function() {
        var term = this;

        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        } else {
          scPlayer.play({playlistIndex: scCurr});
          term.echo("\n");
          term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is resumed");
          term.echo("\n");
        }
      },
      "next": function() {
        var term = this;

        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        }
        else {
          if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
            scPlayer.play({playlistIndex: 0})
          else
            scPlayer.next();
          term.echo("\n");
          term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
          term.echo("\n");
        }
      },
      "prev": function() {
        var term = this;
        if(scPlayer._playlist == undefined) {
          term.echo("\n");
          term.error("You must load a playlist first !");
          term.echo("\n");
        }
        else {
          if(scPlayer._playlistIndex == 0)
            scPlayer.play({playlistIndex: scPlayer._playlist.tracks.length - 1})
          else
            scPlayer.previous();
          term.echo("\n");
          term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
          term.echo("\n");
        }
      },
      "help" : function() {
        this.echo("\n");
        this.error("login :"); this.echo("login in your account"); this.echo("\n");
        this.error("load :"); this.echo("load a playlist (see help inside the function)"); this.echo("\n");
        this.error("currentplaylist :"); this.echo("see the current playlist loaded"); this.echo("\n");
        this.error("currentsong :"); this.echo("see the current song playing"); this.echo("\n");
        this.error("play :"); this.echo("play the current song"); this.echo("\n");
        this.error("pause :"); this.echo("pause the current song"); this.echo("\n");
        this.error("next :"); this.echo("play the next song inside the playlist"); this.echo("\n");
        this.error("prev :"); this.echo("play the previous song inside the playlist"); this.echo("\n");
        this.echo("\n");
        this.echo("To quit the load function press CTRL+D");
        this.echo("\n");
      },
    },
    "help": function() {
      this.echo("\n");
      this.error("f <shortcut>"); this.echo("open the favorites in a new tab"); this.echo("\n");
      this.error("main"); this.echo("goto main terminal"); this.echo("\n");
      this.error("sc"); this.echo("goto soundcloud terminal"); this.echo("\n");
      this.error("cff"); this.echo("goto cff terminal"); this.echo("\n");
      this.echo("\n");
    }
  }, {
    greetings: 'Welcome ' + username,
    name: 'main',
    height: 0,
    prompt: username + '@homepage:~$ '
  });
  mainT.focus();
}

function initGreetings() {
  $(".greetings-helloworld .greetings-name").html(username);

  initClock();
}

function initWeather() {
  locations.forEach(function(i, e) {
    $.simpleWeather({
      zipcode: '',
      woeid: locations[e],
      location: '',
      unit: 'c',
      success: function(weather) {
        var weatherObj = '<p class="weather" id="' + locations[e] + '">' +
          '<span class="weather-location"></span><br>' +
          '<span class="weather-icon"></span>' +
          '<span class="weather-temperature"></span> <br>' +
          '<span class="weather-description"></span>' +
          '</p>';

        $("#weather-board").append(weatherObj);
        $("#" + locations[e] + " .weather-location").html(weather.city + ", " + weather.region);
        $("#" + locations[e] + " .weather-icon").html('<i class="icon-' + weather.code + '"></i>');
        $("#" + locations[e] + " .weather-temperature").html(weather.temp + '&deg;' + weather.units.temp);
        $("#" + locations[e] + " .weather-description").html(weather.currently);
      },
      error: function(error) {
        $("#" + locations[e] + "").html('<p>' + error + '</p>');
      }
    });
  });
}

function initTimeLines() {
  tlLoading = new TimelineMax({
      repeat: -1
    })
    .from($(".s1"), .4, {
      rotation: "-=180"
    }, "#1")
    .from($(".s2"), .5, {
      rotation: "-=180"
    }, "#1")
    .from($(".s3"), .6, {
      rotation: "-=180"
    }, "#1")
    .from($(".s4"), .7, {
      rotation: "-=180"
    }, "#1")
    .pause();

  tlDisplay = new TimelineMax()
    .to($(".squares"), .2, {
      autoAlpha: 0
    })
    .to($(".squares"), .05, {
      height: 0
    }, "#1")
    .from($(".image"), .2, {
      height: 0
    }, "#1")
    .from($(".image"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#greetings-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#weather-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#search-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#favorites-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .from($("#terminal-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    }, "#2")
    .from($("#tabs"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    }, "#2")
    .timeScale(1.2)
    .pause();
}

function initClock() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10)
    dd = '0' + dd
  if (mm < 10)
    mm = '0' + mm
  if (h < 10)
    h = '0' + h
  if (m < 10)
    m = '0' + m
  if (s < 10)
    s = '0' + s

  $(".time-hours").html(h);
  $(".time-minutes").html(m);
  $(".time-seconds").html(s);
  $(".date-day").html(dd);
  $(".date-month").html(mm);
  $(".date-year").html(yyyy);

  if (h < 12) {
    $(".greetings-title").html("Good Morning");
  } else if (h >= 12 && h < 19) {
    $(".greetings-title").html("Good Afternoon");
  } else {
    $(".greetings-title").html("Good Evening");
  }

  var t = setTimeout(initClock, 500);
}

function initSize() {

  $(".mid-pannel, .left-pannel, .right-pannel").height(document.body.clientHeight-20);


  var mxHeight = 0;
  $("#favorites-board .favorite").each(function(index, elem){
     if(mxHeight <= $(elem).height())
        mxHeight = $(elem).height();
  });
  $("#favorites-board .favorite").height(mxHeight);
}

$(document).ready(function() {

  init();

  setTimeout(function() {
    initSize();
  }, 2500)
});

$(window).resize(function() {
  initSize();
})
