function initSoundCloud() {
  console.log("onch");
  SC.get('/tracks', { genres: 'foo' }, function(tracks) {
    $(tracks).each(function(index, track) {
      console.log(track.title + ' - ' + track.genre);
    });
  });
}
