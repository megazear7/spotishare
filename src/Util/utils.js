function createCookie(name, value, seconds) {
   var maxAge = "; max-age="+seconds;
   document.cookie = name+"="+value+maxAge+"; path=/";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function findGetParam(paramName) {
  var result = null,
      tmp = [];
  window.location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === paramName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

var findHashParam = function(key) {
  if (typeof key !== 'string') {
    key = '';
  }
    
  var keyAndHash = window.location.hash.match(new RegExp(key + '=([^&]*)'));
  var value = '';
    
  if (keyAndHash) {
    value = keyAndHash[1];
  }
   
  return value;
};

function apiUrl(path) {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001"+path
  } else if (process.env.NODE_ENV === "production") {
    return path;
  }
  return ;
}

function getAccessToken() {
  return findHashParam("access_token") || getCookie("spotify_access_token");
}

function getRefreshToken() {
  return findHashParam("refresh_token") || getCookie("spotify_refresh_token");
}

function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export { createCookie, getCookie, findGetParam, apiUrl, getAccessToken, getRefreshToken, findHashParam, deleteCookie };
