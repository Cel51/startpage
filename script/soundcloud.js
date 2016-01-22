// var scPlayer = null;
// var scMe = null;
//
// function initSoundcloud() {
//   scPlayer = new SoundCloudAudio(clientid);
//
//   SC.initialize({
//     client_id: clientid,
//     redirect_uri: redirecturi
//   });
//   SC.connect(function() {
//     SC.get('/me', function(me) {
//       scMe = me;
//     });
//   });
//
//   scT = $('.terminal-term.sc #sc').terminal({
//   "load" : {
//     "likes": function() {
//       var term = this;
//
//       scPlayer.resolve('https://soundcloud.com/'+scMe.permalink+'/likes', function (playlist, err) {
//         scPlayer.play({playlistIndex: 0});
//         scPlayer.pause();
//         scPlayer.on('ended', function () {
//           if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//             scPlayer.play({playlistIndex: 0})
//           else
//             scPlayer.next();
//         });
//       });
//
//       term.echo("\n");
//       term.error("Call currentplaylist to see the loaded plalist");
//       term.echo("\n");
//     },
//     "tracks": function() {
//       var term = this;
//
//       scPlayer.resolve('https://soundcloud.com/'+scMe.permalink+'/tracks', function (playlist, err) {
//         scPlayer.play({playlistIndex: 0});
//         scPlayer.pause();
//         scPlayer.on('ended', function () {
//           if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//             scPlayer.play({playlistIndex: 0})
//           else
//             scPlayer.next();
//         });
//       });
//
//       term.echo("\n");
//       term.error("Call currentplaylist to see the loaded plalist");
//       term.echo("\n");
//     },
//     "playlist": function(playlist) {
//       var term = this;
//       scPlayer.resolve('https://soundcloud.com/'+scMe.permalink+'/sets/'+playlist, function (playlist, err) {
//         scPlayer.play({playlistIndex: 0});
//         scPlayer.pause();
//         scPlayer.on('ended', function () {
//           if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//             scPlayer.play({playlistIndex: 0})
//           else
//             scPlayer.next();
//         });
//       });
//
//       term.echo("\n");
//       term.error("Call currentplaylist to see the loaded plalist");
//       term.echo("\n");
//     },
//     "user": function(username, mod, playlist) {
//       var term = this;
//
//       if(mod == 'playlist') {
//         scPlayer.resolve('https://soundcloud.com/'+username+'/sets/'+playlist, function (playlist, err) {
//           scPlayer.play({playlistIndex: 0});
//           scPlayer.pause();
//           scPlayer.on('ended', function () {
//             if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//               scPlayer.play({playlistIndex: 0})
//             else
//               scPlayer.next();
//           });
//         });
//       } else if (mod == 'likes') {
//         scPlayer.resolve('https://soundcloud.com/'+username+'/likes', function (playlist, err) {
//           scPlayer.play({playlistIndex: 0});
//           scPlayer.pause();
//           scPlayer.on('ended', function () {
//             if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//               scPlayer.play({playlistIndex: 0})
//             else
//               scPlayer.next();
//           });
//         });
//       } else {
//         scPlayer.resolve('https://soundcloud.com/'+username+'/tracks', function (playlist, err) {
//           scPlayer.play({playlistIndex: 0});
//           scPlayer.pause();
//           scPlayer.on('ended', function () {
//             if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//               scPlayer.play({playlistIndex: 0})
//             else
//               scPlayer.next();
//           });
//         });
//       }
//
//       term.echo("\n");
//       term.error("Call currentplaylist to see the loaded plalist");
//       term.echo("\n");
//     },
//     "help" : function() {
//       this.echo("\n");
//       this.error("likes"); this.echo("load your account favorites"); this.echo("\n");
//       this.error("tracks"); this.echo("load your account tracks"); this.echo("\n");
//       this.error("playlist <name of the playlist>"); this.echo("load one of your playlist"); this.echo("\n");
//       this.error("user <username>"); this.echo("load the user's tracks"); this.echo("\n");
//       this.error("user <username> likes"); this.echo("load the user's favorites"); this.echo("\n");
//       this.error("user <username> playlist <name of the playlist>"); this.echo("load one of the user's playlist");this.echo("\n");
//       this.echo("\n");
//       this.error("main"); this.echo("goto main terminal"); this.echo("\n");
//       this.error("sc"); this.echo("goto soundcloud terminal"); this.echo("\n");
//       this.error("cff"); this.echo("goto cff terminal"); this.echo("\n");
//       this.echo("\n");
//       this.echo("to quit the load function press CTRL+D");
//       this.echo("\n");
//     }
//   },
//   "currentplaylist": function() {
//     var term = this;
//
//     if(scPlayer._playlist == undefined) {
//       term.echo("\n");
//       term.error("You must load a playlist first !");
//       term.echo("\n");
//     }
//     else {
//       term.echo("\n");
//       $(scPlayer._playlist.tracks).each(function(index, track) {
//         if(scPlayer._playlistIndex == index)
//           term.error(index + "\t\t" + track.title);
//         else
//           term.echo(index + "\t\t" + track.title);
//       });
//       term.echo("\n");
//     }
//   },
//   "currentsong": function() {
//     var term = this;
//
//     if(scPlayer._playlist == undefined) {
//       term.echo("\n");
//       term.error("You must load a playlist first !");
//       term.echo("\n");
//     }
//     else {
//       term.echo("\n");
//       term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
//       term.echo("\n");
//     }
//   },
//   "play" : function() {
//     var term = this;
//
//     if(scPlayer._playlist == undefined) {
//       term.echo("\n");
//       term.error("You must load a playlist first !");
//       term.echo("\n");
//     }
//     else {
//       scPlayer.play();
//       term.echo("\n");
//       term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
//       term.echo("\n");
//     }
//   },
//   "pause" : function() {
//     var term = this;
//     if(scPlayer._playlist == undefined) {
//       term.echo("\n");
//       term.error("You must load a playlist first !");
//       term.echo("\n");
//     }
//     else {
//       scPlayer.pause();
//       term.echo("\n");
//       term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is paused");
//       term.echo("\n");
//     }
//   },
//   "next": function() {
//     var term = this;
//
//     if(scPlayer._playlist == undefined) {
//       term.echo("\n");
//       term.error("You must load a playlist first !");
//       term.echo("\n");
//     }
//     else {
//       if(scPlayer._playlistIndex == scPlayer._playlist.tracks.length - 1)
//         scPlayer.play({playlistIndex: 0})
//       else
//         scPlayer.next();
//       term.echo("\n");
//       term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
//       term.echo("\n");
//     }
//   },
//   "prev": function() {
//     var term = this;
//     if(scPlayer._playlist == undefined) {
//       term.echo("\n");
//       term.error("You must load a playlist first !");
//       term.echo("\n");
//     }
//     else {
//       if(scPlayer._playlistIndex == 0)
//         scPlayer.play({playlistIndex: scPlayer._playlist.tracks.length - 1})
//       else
//         scPlayer.previous();
//       term.echo("\n");
//       term.error(scPlayer._playlistIndex + "\t\t" + scPlayer._playlist.tracks[scPlayer._playlistIndex].title + " is playing");
//       term.echo("\n");
//     }
//   },
//   "help" : function() {
//     this.echo("\n");
//     this.error("load :"); this.echo("load a playlist (see help inside the function)"); this.echo("\n");
//     this.error("currentplaylist :"); this.echo("see the current playlist loaded"); this.echo("\n");
//     this.error("currentsong :"); this.echo("see the current song playing"); this.echo("\n");
//     this.error("play :"); this.echo("play the current song"); this.echo("\n");
//     this.error("pause :"); this.echo("pause the current song"); this.echo("\n");
//     this.error("next :"); this.echo("play the next song inside the playlist"); this.echo("\n");
//     this.error("prev :"); this.echo("play the previous song inside the playlist"); this.echo("\n");
//     this.echo("\n");
//     this.echo("To quit the load function press CTRL+D");
//     this.echo("\n");
//   },
//   "main": function() {
//       showTab("main");
//       mainT.focus(true);
//   },
//   "sc": function() {
//       if($(".terminal#sc").length == 0) {
//           addTab("sc", "SC");
//           initSoundcloud();
//       }
//       showTab("sc");
//       scT.focus(true);
//   },
//   "cff": function() {
//       if($(".terminal#cff").length == 0) {
//           addTab("cff", "CFF");
//           initCFF();
//       }
//       showTab("cff");
//       cffT.focus(true);
//   }
//   },{
//         greetings: 'Welcome to SoundCloud ' + username + '\n\nType help for informations',
//         name: 'sc',
//         height: 0,
//         prompt: 'SoundCloud > '
//     }
//   );
// }
