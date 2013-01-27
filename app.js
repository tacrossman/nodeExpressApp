var express = require('express')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
});

app.get("/", function(req, res){
  res.render("home.jade", { title: "Building super kick ass web booming apps with node & express" });
});

// app.get("/hi", function(req, res){
//   var message = [
//     "<h1> Hello Express</h1>",
//     "<p>Boooming paragraph</p>",
//     "<p>second amazing words</p>",
//     "<ul><li>create</li>",
//     "<li>make</li>",
//     "<li>execture</li></ul>"].join("\n");

//   res.send(message);
// });

// app.get("/users/:userId", function(req, res){
//   res.send("<h1>Hello, User #" + req.params.userId + "!");
// });

// app.post("/users", function(req, res){
//   res.send("Create new users with the name " + request.body.username + ".");
// });

// app.get(/\/users\/(\d*)\/?(edit)?/, function(req,res){

//   var message = "user #" + req.params[0] + "'s profile";

//   if (req.params[1] === "edit") {
//     message = "Editing " + message;
//   } else {
//     message = "Viewing " + message;
//   }
//   res.send(message);
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
