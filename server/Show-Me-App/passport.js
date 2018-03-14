const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use('facebookToken', new FacebookTokenStrategy({
	clientID: '159840638064281',
	clientSecret: '950e64df0eb1410040886e2abe459a77'
}, async(accessToken, refreshToken, profile, done)=>{
	try{
		console.log('profile', profile);
		console.log('refreshToken', refreshToken);
		console.log('accessToken', accessToken);
	}
	catch(error){
		done(error, false, error.message);
	}
}));