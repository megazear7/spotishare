function createCookie(name, value, seconds) {
   var maxAge = "; max-age="+seconds;
   document.cookie = name+"="+value+maxAge+"; path=/";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  window.location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

function apiUrl(path) {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001"+path
  } else if (process.env.NODE_ENV === "production") {
    return path;
  }
  return ;
}

export { createCookie, getCookie, findGetParameter, apiUrl };
