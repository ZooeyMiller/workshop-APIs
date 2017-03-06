/* let's go! */

// access token 70d5e73805aa38b2c363f7caa015c2d2051e3a7d

function getUser(userName){

  var url = "https://api.github.com/users/" + userName + "?access_token=70d5e73805aa38b2c363f7caa015c2d2051e3a7d"

  return url;

}

function makeRequest(url){
  var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      var profileObj = JSON.parse(xhr.responseText);
      getStars(getStarsUrl(profileObj));
      setDom(profileObj);
    }

  }
  xhr.open("GET", url, true);
  xhr.send();
}

function setDom(obj){
  var name = document.getElementById("github-user-handle");
  var avatar = document.getElementById("github-user-avatar")
  var repoNum = document.getElementById("github-user-repos")

  name.innerHTML = obj.name;
  avatar.src = obj.avatar_url;
  repoNum.innerHTML = obj.public_repos;
}

function getStarsUrl(obj){
  var starsUrl = obj.starred_url;
  starsUrl = starsUrl.slice(0, starsUrl.length - 15);
  starsUrl += "?access_token=70d5e73805aa38b2c363f7caa015c2d2051e3a7d"

  return starsUrl;
}

function getStars(url){
  var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      var starsArr = JSON.parse(xhr.responseText);
      setStars(starsArr);
    }

  }
  xhr.open("GET", url, true);
  xhr.send();
}

function setStars(arr){
  var starElement = document.getElementById("github-repos-stars");
  starElement.innerHTML = arr.length;
}

var submit = document.getElementById("submit");
var textField = document.getElementById("user-input");

submit.addEventListener("click", function(){
  makeRequest(getUser(textField.value));
});
