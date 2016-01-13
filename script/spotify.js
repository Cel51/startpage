var spotifyUser = null;
var spotifyApi = new SpotifyWebApi();
var spotifyPlaylists = null;

function initSpotify() {
  spotifyApi.getMe().then(function(data) {
      spotifyUser = data;
    });
}
function getPlaylistsSpotify() {
  var promise = $.Deferred();

  spotifyApi.getUserPlaylists(spotifyUser.id, {limit: 20, offset: 0}).then(function(data) {
    var playlists = data.items;
    promise.resolve(playlists);
    spotifyPlaylists = playlists;
  }, function(err) {
    promise.reject(err);
  });
  return promise;
}
function getPlaylistSpotify() {
  var promise = $.Deferred();

  if(spotifyPlaylists==null) {
    getPlaylistsSpotify().then(function(playlists) {
        spotifyPlaylists = playlists;
    });
  }



}
