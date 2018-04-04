import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
//import router from '../../router'



export default class AuthService {



   login () {
     //console.log("in login of AuthServ.js")
     new auth0.WebAuth({
       domain: AUTH_CONFIG.domain,
       clientID: AUTH_CONFIG.clientId,
       redirectUri: AUTH_CONFIG.callbackUrl,
       audience: `https://${AUTH_CONFIG.domain}/userinfo`,
       responseType: 'token id_token',
       scope: 'openid profile email phone'
     }).authorize()
     //handleAuthentication()
   }



   handleAuthentication () {
     this.auth0.parseHash((err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         console.log(authResult.accessToken)
         //this.setSession(authResult)
       //router.replace('home')
     } else if (err) {
       //router.replace('home')
       console.log(err)
       alert(`Error: ${err.error}. Check the console for further details.`)
     }
   })
   }

     setSession (authResult) {
       // Set the time that the access token will expire at
       let expiresAt = JSON.stringify(
         authResult.expiresIn * 1000 + new Date().getTime()
       )
       localStorage.setItem('access_token', authResult.accessToken)
       localStorage.setItem('id_token', authResult.idToken)
       localStorage.setItem('expires_at', expiresAt)
       this.authNotifier.emit('authChange', { authenticated: true })
     }

  logout () {
    localStorage.removeItem('userData')
    localStorage.setItem('authorized', false)
    console.log('user data : ' + localStorage.getItem('userData'))
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    //this.authNotifier.emit('authChange', false)
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let authUser = localStorage.getItem('authorized')
    return authUser;
  }
}
