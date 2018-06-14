"use strict";

let express = require('express');
let WebSocketServer = require('websocket').server;
let http = require('http');
let app = express();
let videos = [];


app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));
app.get('/', function(req,res) {
        res.render('index');
});
app.get('/watch', function(req,res) {
        console.log(req.query.videolink);
        res.render('watch',{videolink: req.query.videolink});
});

let server = http.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

// create the server
var wsServer = new WebSocketServer({
  httpServer: server
});



// WebSocket server
wsServer.on('request', function(request) {

  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
  var connection = request.accept(null, request.origin);
  console.log((new Date()) + ' Connection accepted.');

  //send index of client to client


  connection.on('message', function(message) {

    if(message.type = 'utf8'){

      let data = JSON.parse(message.utf8Data);

      if(data.type === 'initialiser'){

        let video = videos.find(video => video.id === data.videolink);
        if(video === undefined){
          videos.push({id: data.videolink, clients: [connection]});
        }else {
          video.clients.push(connection);
        }
        connection.idVideo = data.videolink;

      }else if(data.type === 'pause'){

        let video = videos.find(video => video.id === connection.idVideo);
        video.clients.forEach((client)=>{
          console.log(connection);
          if(client!=connection){
            client.send(JSON.stringify({type: "pause", currentTime: data.currentTime}));
          }
        });

      }else if(data.type === 'play'){

        let video = videos.find(video => video.id === connection.idVideo);
        video.clients.forEach((client)=>{
          if(client!=connection){
            client.send(JSON.stringify({type: "play", currentTime: data.currentTime}));
          }
        });

      }
    }
  });

  connection.on('close', function(connection) {
    console.log(this.idVideo);
    let video = videos.find(video => video.id === this.idVideo);
    let index = video.clients.indexOf(this);
    video.clients.splice(index, 1);

  });
});
