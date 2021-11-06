const express = require('express')
const request = require('request');
const dotenv = require('dotenv');

const port = 5000

global.access_token = ''

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

var spotify_redirect_uri = 'http://localhost:3000/auth/callback'

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get('/auth/login', (req, res) => {

  var scope = "streaming user-read-email user-read-private"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

  var code = req.query.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect('/')
    }
  });

})

app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token})
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

module.exports.spotifyCallback = function (req, res) {
  spotifyApi.authorizationCodeGrant(req.query.code).then(function(data) {
      spotifyApi.setAccessToken(data.body.access_token);
      spotifyApi.setRefreshToken(data.body.refresh_token);
      return spotifyApi.getMe()

  }).then(function(data) {
      spotifyApi.getMyRecentlyPlayedTracks({
          limit: 50
      }).then(function(data) {
          var arr = [], songIDs = [];
          data.body.items.forEach(function(p) {
              var obj = {
                  id: p.track.id,
                  played_at: p.played_at,
                  name: p.track.name
              };

              arr.push(obj);
              songIDs.push(p.track.id);

          });
          //calculating the time difference
          var startTime = Date.parse(arr[arr.length - 1].played_at);
          var endTime = Date.parse(arr[0].played_at);
          //convert to hours
          var timeDif = (endTime - startTime) / (1000 * 60 * 60);

          if (timeDif < 10) {
              req.session.timeDiff = 0;
              console.log('timeDIff' + 0)
          } else if (timeDif > 10 && timeDif < 18) {
              req.session.timeDiff = 1;
              console.log('timeDIff' + 1)
          } else {
              req.session.timeDiff = 2;
              console.log('timeDIff' + 2)
          }
          spotifyApi.getAudioFeaturesForTracks(songIDs).then(function(data) {

              var danceability = 0, key = [], loudness = 0, valence = 0, tempo = 0, mode = 0, energy = 0, speechiness = 0,
                  acousticness = 0, instrumentalness = 0, liveness = 0;

              data.body.audio_features.forEach(function(p1, p2, p3) {
                  danceability += p1.danceability;
                  key.push(p1.key);
                  loudness += p1.loudness;
                  valence += p1.valence;
                  tempo += p1.tempo;
                  mode += p1.mode;
                  energy += p1.energy;
                  speechiness += p1.speechiness;
                  acousticness += p1.acousticness;
                  instrumentalness += p1.instrumentalness;
                  liveness += p1.liveness;
              });
              var obj = {
                  danceability: danceability / data.body.audio_features.length,
                  key: frequent(key),
                  loudness: loudness / data.body.audio_features.length,
                  valence: valence / data.body.audio_features.length,
                  tempo: tempo / data.body.audio_features.length,
                  mode: Math.round(mode / data.body.audio_features.length),
                  energy: energy / data.body.audio_features.length,
                  speechiness: speechiness / data.body.audio_features.length,
                  acousticness: acousticness / data.body.audio_features.length,
                  instrumentalness: instrumentalness / data.body.audio_features.length,
                  liveness: liveness / data.body.audio_features.length
              };
              req.session.obj = obj;
              res.redirect('/musicScape');
          });
      });
      req.session.user = data.body.id.length > 10? data.body.display_name : data.body.id;
  });
};

function frequent(array) {
  if(array.length == 0)
      return null;
  var modeMap = {};
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++)
  {
      var el = array[i];
      if(modeMap[el] == null)
          modeMap[el] = 1;
      else
          modeMap[el]++;
      if(modeMap[el] > maxCount)
      {
          maxEl = el;
          maxCount = modeMap[el];
      }
  }
  return maxEl;
}