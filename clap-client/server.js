//#!/usr/bin/env node

//
// WebSocket chat server
// Implemented using Node.js
//
// Requires the websocket module.
//

"use strict";

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var WebSocketServer = require('websocket').server;
var cp = require('child_process');

const server = process.argv[2] || '10.44.63.14'; // gets the first argument on cli

var connectionArray = [];
var nextID = Date.now();
var thisId = 0;

var httpServer = http.createServer(function(request, response) {
    var mime = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };

    var requestUrl = request.url;

    var pathName = url.parse(requestUrl).pathname;

    var pathName = decodeURI(pathName);

    if (!pathName.endsWith('/') && path.extname(pathName) === '') {
        pathName += '/';
        var redirect = "http://" + request.headers.host + pathName;
        response.writeHead(301, {
            location: redirect
        });
        response.end();
    }

    var filePath = path.resolve(__dirname + pathName);
    console.log(filePath);
    var ext = path.extname(pathName);
    ext = ext ? ext.slice(1) : 'unknown';

    var contentType = mime[ext] || "text/plain";

    fs.stat(filePath, (err, stats) => {
        if (err) {
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        }

        if (!err && stats.isFile()) {
            readFile(filePath, contentType);
        }

        if (!err && stats.isDirectory()) {
            var html = "<head><meta charset = 'utf-8'/></head><body><ul>";

            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.log("读取路径失败！");
                } else {

                    var flag = false;
                    for (var file of files) {

                        if (file === "index.html") {
                            readFile(filePath + (filePath[filePath.length-1]=='/' ? '' : '/') + 'index.html', "text/html");
                            flag = true;
                            break;
                        };
                        html += `<li><a href='${file}'>${file}</a></li>`;
                    }
                    if(!flag) {
                        html += '</ul></body>';
                        response.writeHead(200, { "content-type": "text/html" });
                        response.end(html);
                    }
                }
            });
        }


        function readFile(filePath, contentType){
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
            response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            response.writeHead(200, { "content-type": contentType });

            var stream = fs.createReadStream(filePath);
            stream.on('error', function() {
                response.writeHead(500, { "content-type": contentType });
                response.end("<h1>500 Server Error</h1>");
            });
            stream.pipe(response);
        }
    });
});

httpServer.listen(8080, function() {
    console.log((new Date()) + " Server is listening on port 8080");
	cp.exec(`explorer http://localhost:8123`, function () {
    });
});

console.log('connect to', server);
var kcp = require('node-kcp');
var kcpobj = new kcp.KCP(123, {address: server, port: 41234});
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var msg = 'hello world';
var idx = 1;
var interval = 25;

kcpobj.nodelay(0, interval, 0, 0);

kcpobj.output((data, size, context) => {
    client.send(data, 0, size, context.port, context.address);
});

client.on('error', (err) => {
    console.log(`client error:\n${err.stack}`);
    client.close();
});

client.on('message', (msg, rinfo) => {
    kcpobj.input(msg);
});

kcpobj.send('handshake');
var interval = setInterval(() => {
    kcpobj.update(Date.now());
    var recv = kcpobj.recv();
    if (recv) {
        
        thisId = recv.toString();
        console.log('id:' + thisId);
        clearInterval(interval);
    }
}, interval);
// Create the WebSocket server

// console.log("***CREATING WEBSOCKET SERVER");
var wsServer = new WebSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});
console.log("***CREATED");


console.log("***CRETING REQUEST HANDLER");
wsServer.on('request', function(request) {

  // Accept the request and get a connection.
  var connection = request.accept("", request.origin);

  // Add the new connection to our list of connections.

  console.log((new Date()) + " Connection accepted.");
  connectionArray.push(connection);

  // Send the new client its token; it will
  // respond with its login username.

  connection.clientID = nextID;
  nextID++;

  var msg = {
    type: "id",
    id: connection.clientID
  };
  connection.sendUTF(JSON.stringify(msg));

  // Handle the "message" event received over WebSocket. This
  // is a message sent by a client, and may be text to share with
  // other users or a command to the server.

  connection.on('message', function(message) {
      console.log("***MESSAGE");
      if (message.type === 'utf8') {
          console.log("Received Message: " + message);

          // Look at the received message type and
          // handle it appropriately.
          console.log(Date.now());
          kcpobj.update(Date.now());
          console.log(thisId);
          thisId && kcpobj.send(thisId.toString());
          // Convert the message back to JSON and send it out
          // to all clients
      }
  });

  // Handle the WebSocket "close" event; this means a user has logged off
  // or has been disconnected.

  connection.on('close', function(connection) {
  });
});
// console.log("***REQUEST HANDLER CREATED");
