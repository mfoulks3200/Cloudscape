var http = require("http");
var log = require("./log");
var fs = require('fs');
var url = require("url");
var path = require('path');
var uptime = 0;

function start(port,debug) {
        log.log("Frontend Server Starting on port "+port);
        var ports = port;
        exports.ports = ports;
  function onRequest(request, response) {
                var file = null;
                try {
                        file = path.normalize(decodeURI(url.parse(request.url).pathname));
                } catch (e) {
                }
                if (file.substring(file.length-1) == "\\"){
                        file = file + "index.html";
                }
                file = "app"+file
                fname = file.substring(4);
                log.log("Frontend request for " + file.substring(4) + " received from "+request.connection.remoteAddress);
                fs.exists(file, function(exists) {
                  if (exists) {
                        fs.readFile(file, "binary", function(err, file) {  
                                if(err) {  
                                        response.wireHead(500, {"Content-Type": "text/plain"});  
                                        response.write(err + "\n");  
                                        response.end(); 
                                        log.warn("Frontend request for " + fname + " from "+request.connection.remoteAddress+" returned with error code " + err);
                                        return;  
                                }
                                response.writeHead(200);  
                                response.write(file, fname.substring(fname.length-4, fname.length), "binary");  
                                response.end();  
                                log.log("Frontend request for " + fname + " from "+request.connection.remoteAddress+" fufilled");
                        });  
                  } else {
                        response.writeHead(404, {"Content-Type": "text/html"});
                        response.write("Error 404: File not Found");
                        response.end();
                        log.warn("Frontend request for " + fname + " from "+request.connection.remoteAddress+" could not be located");
                  }
                });
        }
        
        http.createServer(onRequest).listen(port);
        log.log("Frontend started listening");
        setInterval(function(){uptime++;}, 1000);
}

function getUptime(){
        var muptime = Math.floor(uptime / 60);
        var huptime = Math.floor(uptime / 36000);
        var duptime = Math.floor(uptime / 8640000);
        if(uptime >= 8640000){
                log.log("Uptime: Days: "+duptime+" Hours: "+huptime+"Minutes: "+muptime+" Seconds: "+uptime);
        }else if(uptime >= 36000){
                log.log("Uptime: Hours: "+huptime+"Minutes: "+muptime+" Seconds: "+uptime);
        }else if(uptime >= 60){
                log.log("Uptime: Minutes: "+muptime+" Seconds: "+uptime);                
        }else if(uptime >= 1){
                log.log("Uptime: Seconds: "+uptime);
        }
}

exports.start = start;
exports.getUptime = getUptime;