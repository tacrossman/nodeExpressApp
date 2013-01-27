var express = require('express')
  , http = require('http');

var app = express();

app.configure(function(){
	//app settings
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	//use includes middleware
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
});

// new users array
var users = [
	{ name: 'thomas'},
	{ name: 'jana'}
];

function loadUser (req, res, next){
	req.user = users[parseInt(req.params.userId, 10)];
	next();
}

app.get("/users/:userId", loadUser, function(req, res){
	//get user
	res.json(req.user);
});

//start counter for tracking downloads
var count = 0;

app.get('/hello.txt', function(req, res, next){
	//can override the text via custom route
	//res.send('boom');
	//increment the counter to track potential donwloads of hello.text
	count++;
	next();
})

app.get('/count', function(req, res){
	//print the ammount of views/downloads of above hello.txt to /count route
	res.send("" + count + " views");
});

//users variable
var users2 = ['jane', 'tom', 'dave', 'john', 'jane'];

app.param('from', function(req, res, next, from){
	req.from = parseInt(from, 10);
	//passing the function to the next middleware layer
	next();
});

app.param('to', function(req, res, next, to){
	req.to = parseInt(to, 10);
	//passing the function to the next middleware layer
	next();
});

app.get('/users/:from-:to', function(req, res){
	//return the users in the json i.e /users/0-1
	res.json(users2.slice(req.from, req.to + 1));
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

app.get("/json", function(req, res){
	//return json data
	//res.json({ message: "boomting mesage"});
	//format method
	res.format({
		//html response header
		html: function() { res.send("<h1> Body </h1>"); },
		//json response header
		json: function() { res.json( { message: "body"}); },
		//text response header
		text: function() { res.send("body"); }
	});
});

app.get('/home', function(req, res){
	//redirect any /home url to root
	//res.redirect(302, "/");
	//response status redirect
	res.status(302).redirect("/");
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

