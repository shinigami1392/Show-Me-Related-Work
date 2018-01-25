var express = require('express');
var ClientOauth2 = require('client-oauth2');
var app = express();
var githubAuth = new ClientOauth2({
	  clientId: '9ea26663547229ca1e26',
	  clientSecret: '223afad546227e9360a18db2db591952d12a074a',
	  accessTokenUri: 'https://github.com/login/oauth/access_token',
	  authorizationUri: 'https://github.com/login/oauth/authorize',
	  redirectUri: 'http://example.com/auth/github/callback',
	  scopes: ['notifications', 'gist']
});

var token = githubAuth.createToken('access token', 'optional refresh token', 'optional token type', { data: 'raw user data' })
 
// Set the token TTL. 
token.expiresIn(1234) // Seconds. 
token.expiresIn(new Date('2016-11-08')) // Date. 
 
// Refresh the users credentials and save the new access token and info. 
// token.refresh().then(storeNewToken)
 
// Sign a standard HTTP request object, updating the URL with the access token 
// or adding authorization headers, depending on token type. 
token.sign({
  method: 'get',
  url: 'https://api.github.com/users'
}) //=> { method, url, headers, ... } 

app.get('/auth/github', function(req, res){
	var uri = githubAuth.code.getUri();
	//console.log(uri);
	res.redirect(uri);
});

app.get('/auth/github/callback', function(req, res){
	githubAuth.code.getToken(req.originalUrl)
	.then(function(user){
		console.log(user);
		user.refresh().then(function(updateUser){
			console.log(updateUser !== user);
			console.log(updateUser.accessToken);
		});

		user.sign({
			method: 'get',
			url: 'http://example.com'
		});

		return res.send(user.accessToken);
	});
});

app.get('/', function(req, res){
	var html = "<html><head><title>Title</title></head><body><form action='/auth/github'><input type='submit'>Click Me!</input></form></body></html>"
	res.send(html);
});

app.get('/callback', function(req, res){
	//console.log(req.originalUrl);
	// githubAuth.code.getToken(req.originalUrl)
	// .then(function(user){
	// 	//console.log(user);
	// 	});
	res.send('Hello world! I am redirected');
});

var server = app.listen(8085, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
});