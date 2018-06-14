
// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

var connection = new WebSocket('ws://shielded-hamlet-63582.herokuapp.com');
var idClient;
connection.onopen = function () {
  let data = {
    type: "initialiser",
    videolink: idVideo
  };
  connection.send(JSON.stringify(data));
};

connection.onerror = function (error) {
  // an error occurred when sending/receiving data
};

connection.onmessage = function (message) {
  // try to decode json (I assume that each message
  // from server is json)
  let json;
  try {
    json = JSON.parse(message.data);
  } catch (e) {
    console.log('This doesn\'t look like a valid JSON: ', message.data);
    return;
  }
  if(json.type==='play'){
    console.log("Play");
    if(player.getPlayerState()!=YT.PlayerState.PLAYING){
      player.playVideo();
    }
    if(Math.abs(player.getCurrentTime() - json.currentTime)>0.5){
      player.seekTo(json.currentTime);
    }
  }else if(json.type==='pause'){
    console.log("Pause");
    if(player.getPlayerState()!=YT.PlayerState.PAUSED){
      player.pauseVideo();
    }
    if(Math.abs(player.getCurrentTime() - json.currentTime)>0.5){
      player.seekTo(json.currentTime);
    }

  }else {
    console.log("Something is wrong");
  }
};
