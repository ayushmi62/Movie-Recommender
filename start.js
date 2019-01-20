// import express JS module into app
// and creates its variable.
var express = require('express');
var app = express();
var PythonShell = require('python-shell');
var pyshell = new PythonShell('new.py');
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    var allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    // Pass to next layer of middleware
    next();
});

app.listen(3000, function() {
    console.log('server running on port 3000');
} )

app.get('/name', callName);

function callName(req, res) {
  console.log('in function');
    // var spawn = require("child_process").spawn;
    // console.log('after');
    // var process = spawn('python',["Y:/#STUDY/test/new.py"]);
    //
    //                         console.log('after process');
    // process.stdout.on('data', function(data) {
    //   console.log("data.toString()");
    //   console.log(data.toString());
    //     res.send(data.toString());
    // } )
    // console.log("at end");
    var pyVar = req.query.session;
    var resp = [];
    // sends a message to the Python script via stdin
    pyshell.send(pyVar);


    pyshell.on('message', function (message) {
      message=message+'\n';
      // received a message sent from the Python script (a simple "print" statement)
      resp.push(message);
      console.log(message);

      //res.send(message.toString());
    });

    //end the input stream and allow the process to exit
    pyshell.end(function (err,code,signal) {
      if (err)
        console.log("err");
      console.log('The exit code was: ' + code);
      // for(i=0;i<resp.length;i++){
      //   //console.log(resp[i]);
      // }
      console.log('The exit signal was: ' + signal);
      console.log('finished');
      console.log('finished');
      res.send(resp);
    });
}
