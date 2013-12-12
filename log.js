var fs = require("fs");
var red, green, yellow, blue, magenta, cyan, white;
red   = '\u001b[31m';
green  = '\u001b[32m';
yellow   = '\u001b[33m';
blue  = '\u001b[34m';
magenta   = '\u001b[35m';
cyan  = '\u001b[36m';
white   = '\u001b[37m';

function checkTime(i){
        if (i<10){
                i="0" + i;
        }
        return i;
}

function getTime(){
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        var mo=today.getMonth()+1;
        var d=today.getDate();
        var y=today.getFullYear();
        // add a zero in front of numbers<10
        m=checkTime(m);
        s=checkTime(s);
        return h+":"+m+":"+s+" "+mo+"/"+d+"/"+y;
}

module.exports = {
        log: function(message){
                console.log(cyan + "["+getTime()+"] [Log] "+ white +message);
                fs.appendFile("log.txt", "["+getTime()+"] [Log] "+message+"\r\n");
        },

        warn: function(message){
                console.log(cyan + "["+getTime()+"]" + red + " [Warn] "+ white +message);
                fs.appendFile("log.txt", "["+getTime()+"] [Warn] "+message+"\r\n");
        },

        help: function(message){
                console.log(cyan + "["+getTime()+"]" + yellow + " [Help] "+ white +message);
                fs.appendFile("log.txt", "["+getTime()+"] [Help] "+message+"\r\n");
        }
        
};