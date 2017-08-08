import { getAccessToken, getRefreshToken, createCookie, apiUrl, deleteCookie } from './utils.js';
import $ from "jquery";

var SpotAPI = {

  trackSearch: function(text, callback) {
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: text,
        type: "track",
        limit: 5
      },
      headers: {
        'Authorization': 'Bearer ' + getAccessToken()
      },
      success: function(response) {
        if (typeof callback === "function") {
          callback(response);
        }
      }
    });
  },

  refreshToken: function(callback) {
    var refreshToken = getRefreshToken()

    if (refreshToken) {
      $.get({
        url: apiUrl('/refresh_token'),
        data: {
          refresh_token: refreshToken
        },
        success: function(response) {
          if (typeof callback === "function") {
            callback(response);
          }
        },
        error: function() {
          deleteCookie("spotify_refresh_token");
          deleteCookie("spotify_access_token");
          deleteCookie("spotify_user_uri");
          window.location.reload();
        }
      });
    
      // This token may have came from the getParam, so always create it to make
      // sure it makes its way into a cookie.
      createCookie("spotify_refresh_token", refreshToken);
    }
  },

  login: function(callback) {
    var accessToken = getAccessToken()

    console.log(accessToken);

    if (accessToken) {
      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
          if (typeof callback === "function") {
            callback(response);
          }
          window.location.hash = "";
          createCookie("spotify_user_uri", response.uri);
        },
        error: function() {
          deleteCookie("spotify_refresh_token");
          deleteCookie("spotify_access_token");
          deleteCookie("spotify_user_uri");
          window.location.reload();
        }
      });

      // This token may have came from the getParam, so always create it to make
      // sure it makes its way into a cookie.
      createCookie("spotify_access_token", accessToken);
    }
  }

};

export default SpotAPI;
