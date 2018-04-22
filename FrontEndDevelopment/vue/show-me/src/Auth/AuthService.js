import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'

export default class AuthService {

   login () {
     new auth0.WebAuth({
       domain: AUTH_CONFIG.domain,
       clientID: AUTH_CONFIG.clientId,
       redirectUri: AUTH_CONFIG.callbackUrl,
       audience: `https://${AUTH_CONFIG.domain}/userinfo`,
       responseType: 'token id_token',
       scope: 'openid profile email phone'
     }).authorize()
   }

  logout () {
    localStorage.removeItem('userData')
  }
}
