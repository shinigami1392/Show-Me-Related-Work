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
}
