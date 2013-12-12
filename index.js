//  -----Configuration Options-----

var frontendPort = 80; //Where Your App Will Run
var backendendPort = 2121; //Where Your Management Panel Will Run
var debug = true; //Print more information to the console more often

//  -----End Configuration Options-----
var frontend = require("./frontend")
frontend.start(frontendPort, debug)