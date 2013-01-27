var express = require('express')
  , http = require('http');

var app = express();

app.configure(function(){
	//app settings
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	//use includes
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
});

app.get("/", function(req, res){
  res.render("home", { title: "Building super kick ass web booming apps with node & express" });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.get("/agent", function (req, res){
	//get user agent string
	//res.send(req.get('user-agent'));
	// check content types
	//res.send(req.accepts( [  'html', 'text', 'json' ] ));
	// can i accept utf8?
	//res.send(req.acceptsCharset('utf-8') ? 'yes' : 'no');
	//can i accept french? (acceptd languages check)
	res.send(req.acceptsLanguage('fr') ? 'yes' : 'no');
});

app.get("/name/:name?", function (req, res){
	//print out name from URL
	//res.send(req.params.name);
	//setup default vaule for route
	res.send(req.param('name', 'No name setup!'));
	
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

