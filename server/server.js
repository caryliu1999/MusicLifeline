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
var kcp = require('node-kcp');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var clients = {};
var interval = 25;

var connectionArray = [];
var id = 0;

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
});

var output = function(data, size, context) {
    server.send(data, 0, size, context.port, context.address);
};

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    var k = rinfo.address+'_'+rinfo.port;
    if (undefined === clients[k]) {
        var context = {
            address : rinfo.address,
            port : rinfo.port
        };
        var kcpobj = new kcp.KCP(123, context);
        kcpobj.nodelay(0, interval, 0, 0);
        kcpobj.output(output);
        clients[k] = kcpobj;
    }
    var kcpobj = clients[k];
    kcpobj.input(msg);
});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address} : ${address.port}`);
    setInterval(() => {
        for (var k in clients) {
            var kcpobj = clients[k];
        	kcpobj.update(Date.now());
            var recv = kcpobj.recv();
            if (recv === 'hand shake') {
                kcpobj.send(id++);
            }
        	else {
            	console.log(`server recv ${recv} from ${kcpobj.context().address}:${kcpobj.context().port}`);
           		connectionArray.forEach(val => val.sendUTF(recv));
       	 	}
       	}
    }, interval);
});

server.bind(41234);

var wsServer = new WebSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {
  
  var connection = request.accept("", request.origin);

  console.log((new Date()) + " Connection accepted.");
  connectionArray.push(connection);
  
  connection.on('close', function(connection) {
	  var index = connectionArray.indexOf(connection);
	  connectionArray.splice(index, 1);
  });
});

