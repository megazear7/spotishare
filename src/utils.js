function createCookie(name, value, seconds) {
   var maxAge = "; max-age="+seconds;
   document.cookie = name+"="+value+maxAge+"; path=/";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export { createCookie, getCookie };
