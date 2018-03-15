<template>
  <div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
      <div id="logoDiv">
        <a href="/"><img src="../assets/ShowMe3.png" id="logo"></a>
      </div>
      <div class="topnav" align="left">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
    </div>
      <div id="login">
        <facebook-login class="button" appId="159840638064281" @login="onLogin" @logout="onLogout" @sdk-loaded="sdkLoaded"><i class="fab fa-facebook"></i>
        </facebook-login>
        <!-- <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-github"></i>
        </button>

        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-linkedin"></i>
        </button>
        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-facebook"></i>
        </button> -->
        <!-- <a href="/">
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-home"></span> Home <i class="fas fa-home"></i>
          </button>
        </a> -->
      </div>
    </div>
    <!--<div class="navbar-header">
      <a class="navbar-brand" href="#">SHOW ME</a>
    </div>-->

  </div>
</template>

<script>
import axios from "axios";
import VueAuthenticate from 'vue-authenticate';
import Vue from 'vue';
import facebookLogin from './fbLogin.js'
//import facebookLogin from './fbLogin.js'

function sendLoginRequestToLinkedIn() { }
function sendLoginRequestToFacebook() { }

// new Vue({
//   methods: {
//     authenticate: function (provider) {
//       this.$auth.authenticate(provider).then(function () {
//         // Execute application logic after successful social authentication
//       })
//     }
//   }
// })

// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{latest-api-version}'
//     });
      
//     FB.AppEvents.logPageView();   
      
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

function sendLoginRequestToGithub() { }
function sendLogoutRequest() { }

export default {
  data() {
    return {
      isLoggedIn: false,
      userInfo: {
        authenticated: true,
        firstname: "John",
        lastname: "Doe",
        username: "johndoe2020",
        email: "johndoe2020@gmail.com",
        isConnected: false,
        name: '',
        email: '',
        personalID: '',
        FB: undefined
      }
    }
  },
  components: { facebookLogin },
  methods: {
    getUserData() {
      this.FB.api('/user/oauth/facebook', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          console.log(this.personalID);
          console.log(this.email);
          console.log(this.name);
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
};

Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8081', // Your API domain
  
  providers: {
    facebook: {
      clientId: '159840638064281',
      redirectUri: 'http://localhost:8081/' // Your client app URL
    }
  }
})
</script>

<style>
.customNav {
  background: -webkit-radial-gradient(circle, #fff, #fff);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%
}
.header{
      border-radius: 0px;
      width: 100%;
      height: 50px;
      background-color: #343a40;
    }
.customBox {
    background: #343a40;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
#login{
      padding-top: 10px;
      padding-right: 10px;
      padding-left: 10px;
      text-align: right;
      float: right;
    }

#logoDiv{
  width: 100%;
  padding-bottom: 5px;
}

#logo{

  width: 8%;
  padding-top: 3px;
  padding-right: 10px;
  padding-left: 10px;
  float: left;
}

.topnav {
  width: 50%;
  padding-left: 1%;
  float: left;
  text-align: left;
  padding-top: 9px;
}



.topnav input[type=text] {
  font-size: 17px;
  background: #343a40;
  width: 40%;
  border: 1;
  border-radius: 3px;
}

</style>
