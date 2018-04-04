import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Box from './components/Box.vue'
import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'
import PapersTable from './components/PapersTable.vue'
import PaperInfoBox from './components/PaperInfoBox.vue'
import LinkInfoBox from './components/LinkInfoBox.vue'
import PaginatedTable from './components/PaginatedTable.vue'
import Grid from './components/Grid.vue'
import SearchBox from './components/SearchBox.vue'

import { routes } from './routes';
import { store } from './store';

import './assets/css/fontawesome-all.css';

import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'

Vue.use(VueRouter);

Vue.component('app-box', Box);
Vue.component('app-listbox', ListBox);
Vue.component('app-navbar', NavigationBar);
Vue.component('app-table', PapersTable);
Vue.component('app-paper-infobox', PaperInfoBox);
Vue.component('app-link-infobox', LinkInfoBox);
Vue.component('app-paginated-table', PaginatedTable);
Vue.component('grid', Grid);
Vue.component('app-searchbox', SearchBox);


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
    localStorage.removeItem('userData')
    localStorage.setItem('authorized', false)
    console.log('user data : ' + localStorage.getItem('userData'))
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    //this.authNotifier.emit('authChange', false)
  }

  /*isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }*/
}


let webAuth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid profile email phone'
})





const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

import axios from "axios";
function fetchPaperInfo(paperid) {
  axios
    .get(`http://54.201.123.246:8081/graphNode/graphNode/` + paperid)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });

}

var paperInfo = '';
function setPaperInfoValue(value) {
  paperInfo = value;
}

router.beforeEach(function (to, from, next) {
  if (to.name === 'paperInfo') {
    axios
      .get(`http://54.201.123.246:8081/graphNode/graphNode/` + to.params.paperid)
      .then(response => {
        paperInfo = response.data;
        to.matched[0].props.paperInfo = paperInfo;
        setPaperInfoValue(paperInfo);
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }
  else if (to.name === 'linkInfo') {
    var fetchLinkInfo = function () {
      axios
        .get(`http://54.201.123.246:8081/relations/get?id=` + to.params.linkid + '&' + 'user=user0')
        .then(response => {
          to.matched[0].props.linkInfo = response.data;
          next();
        })
        .catch(err => {
          next();
        });
    }

    if (paperInfo == '') {
      axios
        .get(`http://54.201.123.246:8081/graphNode/graphNode/` + to.params.paperid)
        .then(response => {
          paperInfo = response.data;
          to.matched[0].props.paperInfo = paperInfo;
          setPaperInfoValue(paperInfo);
          fetchLinkInfo();
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      to.matched[0].props.paperInfo = paperInfo;
      fetchLinkInfo();
    }
  }
  else {
    next();
  }

}.bind(Vue))

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App),

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