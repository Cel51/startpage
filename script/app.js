// TimeLine variable for the storage of each timeline
var tlLoading, tlDisplay;
// Terminals variable for the focus
var mainT;
// Soundcloud variables for a) the music player b) the user (connected) c) the current music played
var scPlayer = null;
var scMe = null;
var scCurr = null;


// Init function called at the end of the loading of each components
function init() {

  // Background managment with the plugin backstretch
  // Get 1 images from the var.js array of images for the background
  $("body").backstretch("images/"+images[Math.round(Math.random()*(images.length-1))],{fade: 300});

  // Scroll managment for each pannel (smarter screen and after insert of multiple cff informations)
  // Use the plugin mCustomScrollbar.jquery.min.js
  $(".left-pannel, .mid-pannel, .right-pannel").mCustomScrollbar({
    scrollInertia: 300
  });

  // Call of all the function init of each components and size adapter
  initGreetings();
  initWeather();
  initTimeLines();
  initTerminal();
  initSearch();
  initFavorites();
  initRss();
  initSize();

  // Play the loading animation
  tlLoading.play();

  // If all the images are loaded, pause the animation of the loading and call the display timeline
  $("img").on('load',function() {
    tlLoading.pause();
    tlDisplay.play();
  })
  // Old code for the display of the loading animation
  // setTimeout(function() {
  //
  // }, 1210);
}

function initRss() {
  $(feeds).each(function(index, feed) {
    $('#rss-board').append("<p>"+feed[0]+"</p>");
    $('#rss-board').append("<div id='"+index+"'></div");
    $('#rss-board #'+index).FeedEk({
      FeedUrl: feed[1],
      MaxCount: 5,
      DateFormat: 'L',
      DateFormatLang:'en'
      });
  });
}

// Terminal initialisation
function initTerminal() {
  // Init the terminal with each function available
  mainT = $('.terminal-term.main #main').terminal({
    // Favorite function: f <arg> to open in new tab the favorite
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
    // CFF part of the terminal
    "cff": {
      // Get the connections for the passed variable of the CFF terminal
      // travel <from> <to> <time> <date>
      "travel" :function(fromLocation, toLocation, time, date) {

        var term = this;

        if(date==undefined) date = cffDate();
        if(time==undefined) time = cffTime();

        $.get("http://transport.opendata.ch/v1/connections?from="+fromLocation+"&to="+toLocation+"&date="+date+"&time="+time,
        function(data) {
          createCFFdata(data);
        });
      },
      // Reset the CFF informations and empty it
      "reset": function() {
        new TimelineMax({onComplete: function() {$(".informations.cff").remove();}})
        .to($(".informations.cff"), .2 ,{
          height: 0,
          autoAlpha: 0
        })
        .timeScale(.5);
      },
      // Display the help for the CFF part
      "help": function() {
        this.echo("\n");
        this.error("travel <from> <to> <?time> <?date>"); this.echo("display the train informations"); this.echo("\n");
        this.error("reset"); this.echo("clean the cff informations"); this.echo("\n");
        this.error("main"); this.echo("goto main terminal"); this.echo("\n");
        this.error("sc"); this.echo("goto soundcloud terminal"); this.echo("\n");
        this.error("cff"); this.echo("goto cff terminal"); this.echo("\n");
        this.echo("\n");
        this.echo("to quit the cff function press CTRL+D");
        this.echo("\n");
      }
    },
    // SoundCloud Part of the terminal application
    "sc": {
      // Login into Soundcloud
      // TODO: add secret (must have PHP server and secret id to add it), it will be in the Auth0 tocken version
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
      // Enter the load function of the SoundCloud app
      "load" : {
        // Load current logged user favorites tracks into the playlist
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
        // Load current logged user tracks into the playlist
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
        // Load current logged user playlist (must pass a name) into the played playlist
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
        // This function is a bit complicated
        // must pass a user, mod(playlist, tracks or likes) and a name (if playlist) and it load the passed arguments in the played playlist
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
        // Display the help for the load sections
        "help" : function() {
          this.echo("\n");
          this.error("likes"); this.echo("load your account favorites"); this.echo("\n");
          this.error("tracks"); this.echo("load your account tracks"); this.echo("\n");
          this.error("playlist <name of the playlist>"); this.echo("load one of your playlist"); this.echo("\n");
          this.error("user <username>"); this.echo("load the user's tracks"); this.echo("\n");
          this.error("user <username> likes"); this.echo("load the user's favorites"); this.echo("\n");
          this.error("user <username> playlist <name of the playlist>"); this.echo("load one of the user's playlist");this.echo("\n");
          this.echo("\n");
          this.echo("to quit the load function press CTRL+D");
          this.echo("\n");
        }
      },
      // Show the current loaded playlist
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
      // Show the current played song
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
      // Play the song (arg) from the playlist
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
      // Pause the current song played
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
      // Resume the current played song
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
      // Play the next song in the playlist
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
      // Play the previous song in the playlist
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
      // Show the help for the soundcloud part
      "help" : function() {
        this.echo("\n");
        this.error("login"); this.echo("login in your account"); this.echo("\n");
        this.error("load"); this.echo("load a playlist (see help inside the function)"); this.echo("\n");
        this.error("currentplaylist"); this.echo("see the current playlist loaded"); this.echo("\n");
        this.error("currentsong"); this.echo("see the current song playing"); this.echo("\n");
        this.error("play"); this.echo("play the current song"); this.echo("\n");
        this.error("pause"); this.echo("pause the current song"); this.echo("\n");
        this.error("next"); this.echo("play the next song inside the playlist"); this.echo("\n");
        this.error("prev"); this.echo("play the previous song inside the playlist"); this.echo("\n");
        this.echo("\n");
        this.echo("To quit the sc function press CTRL+D");
        this.echo("\n");
      },
    },
    // Help for the terminal
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

// Set the username and call the clock function for the greetings
function initGreetings() {
  $(".greetings-helloworld .greetings-name").html(username);

  initClock();
}

// Init the weather part and add the weather options
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

// Animations initialization
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
    .to($(".image"), 0, {
      height: "auto"
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
    .from($("#rss-board"), .2, {
      autoAlpha: 0,
      marginLeft: "-20"
    })
    .timeScale(1.2)
    .pause();
}

// Clock display
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

// Size update of the app
function initSize() {

  $(".mid-pannel, .left-pannel, .right-pannel").height(document.body.clientHeight-20);


  var mxHeight = 0;
  $("#favorites-board .favorite").each(function(index, elem){
     if(mxHeight <= $(elem).height())
        mxHeight = $(elem).height();
  });
  $("#favorites-board .favorite").height(mxHeight);
}

// On ready magueule
$(document).ready(function() {
  init();
  setTimeout(function() {
    initSize();
  }, 2500)
});

// For each resize
$(window).resize(function() {
  initSize();
})
