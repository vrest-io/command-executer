var http = require('http'),
  url = require('url'),
  sys = require('sys'),
  exec = require('child_process').exec;

var port = process.env.PORT || 3001,
  hostName = process.env.HOST_NAME || '0.0.0.0';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var error = null;
  var result = {
    hasErrors: false
  };
  console.log('URL : ' + req.url);
  if(req.url.indexOf("/execute") != -1){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query,
      command = query.command,
      delay = query.delay,
      limit = (query.limit && parseInt(query.limit)) || 100000,
      childProcess = null;

    console.log("Command : " + command);
    if(command){
      setTimeout(function(){
        if(req.isResponded !== true){
          req.isResponded = true;
          result.info = "Command not responded with in the specified time limit of " + limit + "ms.";
          if(childProcess) result.pid = childProcess.pid;

          res.end(JSON.stringify(result));
        }
      }, limit);

      childProcess = exec(command, function (err, stdout, stderr) {
        var onResponse = function(){
          if(req.isResponded !== true){
            req.isResponded = true;
            result.pid = childProcess.pid;
            if (error !== null) {
              error = err;
            } else {
              result.output = stdout;
            }
            res.end(JSON.stringify(result));
          }
        };

        if(delay){
          delay = parseInt(delay);
          setTimeout(onResponse, delay);
        } else {
          onResponse();
        }
      });
    } else {
      error = "Invalid arguments.";
    }
  } else if(req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Format: <BASE_URL>/execute?command=<cmd to execute>');
  } else {
    error = "Bad Request";
  }

  if(error){
    result.error = error;
    result.hasErrors = true;
    res.end(JSON.stringify(result));
  }

}).listen(port, hostName);

console.log('Server running at http://' + hostName + ':' + port +'/');
