
$('.nav-link').click(function() {
    var sectionTo = $(this).attr('href');
    console.log("click");
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top
    }, 1500);
});

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  /*
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

 var stateKey = 'spotify_auth_state';

var params = getHashParams();

var access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);

if (access_token && (state == null || state !== storedState)) {
  alert('There was an error during the authentication');
} else {
  localStorage.removeItem(stateKey);
  if (access_token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
         // userProfilePlaceholder.innerHTML = userProfileTemplate(response);
        loggedin = true;
        console.log(response);
        }
    });
}}

document.getElementById('login-button').addEventListener('click', function() {

    var client_id = 'e80925f0ded1400d9e4a8c2ac9c7f449'; // Your client id
    var redirect_uri = "http://localhost:5000"
    //'http://www.spotifystats.com/'; // Your redirect uri

    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scope ="user-library-read user-read-private user-read-email user-read-currently-playing user-read-playback-state";

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    window.location = url;


  }, false);

Tracks="";
if (!access_token){
  console.log("not logged in");
}else{
  console.log("logged in");
 $.ajax({
    url: "https://api.spotify.com/v1/me/",
    type: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
    success: function(data){
      document.getElementById("username").innerHTML="WELCOME,<br> "+data['id'].toUpperCase()+"!";
      document.getElementById("greeting").innerHTML="Hope you enjoy these tools!";
      document.getElementById("login-button").remove();
      document.getElementById('login').remove();
      document.getElementById('top').classList.add("mt-5");
    }
  });
}
