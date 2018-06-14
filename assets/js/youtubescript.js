var idVideo = document.getElementById("player").innerText;
console.log(idVideo);
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: idVideo,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PAUSED){
    let currentSecond = player.getCurrentTime();
    let data = {
      type: "pause",
      currentTime: currentSecond
    };
    connection.send(JSON.stringify(data));
  }else if (event.data === YT.PlayerState.PLAYING){
    let currentSecond = player.getCurrentTime();
    let data = {
      type: "play",
      currentTime: currentSecond
    };
    connection.send(JSON.stringify(data));

  }

}
function stopVideo() {
  player.stopVideo();
}
