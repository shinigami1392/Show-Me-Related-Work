import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
//import router from '../../router'



export default class AuthService {
 /* authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  }) */


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
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    router.replace('home')
  }

  /*isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }*/
}


// import auth0 from 'auth0-js'
import Vue from 'vue'
// import { AUTH_CONFIG } from './auth0-variables'
//
// // exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid profile email phone'
})

let auth = new Vue({
  computed: {
    token: {
      get: function() {
        return localStorage.getItem('id_token')
      },
      set: function(id_token) {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get: function() {
        return localStorage.getItem('access_token')
      },
      set: function(accessToken) {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: function() {
        return localStorage.getItem('expires_at')
      },
      set: function(expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get: function() {
        return JSON.parse(localStorage.getItem('user'))
      },
      set: function(user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('user')
      webAuth.authorize()
    })
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
        this.expiresAt = authResult.expiresIn
        this.accessToken = authResult.accessToken
        this.token = authResult.idToken
        this.user = authResult.idTokenPayload
        resolve()

      } else if (err) {
        this.logout()
        reject(err)
      }

    })
    })
    }
  }
})

// export default {
//   install: function(Vue) {
//     Vue.prototype.$auth = auth
//   }
// }
