<template>
  <div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
      <!--<div id="logoDiv">
        <a href="/"><img src="../assets/ShowMe3.png" id="logo"></a>
      </div>-->
      <a href="/"><md-icon class="md-size-2x">home</md-icon></a>

      <div id="login">
        <button type="button" class="btn btn-default btn-sm"  @click="login()">
          <span class="glyphicon glyphicon-home"></span> Sign In <i class="fas fa-sign-in-alt"></i>
        </button>
        <!--<button type="button" class="btn btn-default btn-sm"  @click="logout()">-->
          <!--<span class="glyphicon glyphicon-home"></span> Sign Out <i class="fas fa-sign-out-alt"></i>-->
        <!--</button>-->
        <!--<span>-->
          <!--<md-avatar>-->
            <!--<img :src="userImage" alt="Avatar">-->
          <!--</md-avatar>-->
        <!--</span>-->
        <div v-if="authenticated">
          <md-menu md-align-trigger>
          <md-button class="md-icon-button" md-menu-trigger>
            <md-avatar>
              <img :src="userImage">
            </md-avatar>
            <md-tooltip md-direction="bottom">{{userName}}</md-tooltip>
          </md-button>

          <md-menu-content>
            <md-menu-item>
              <span><b>Hi, {{userName}}</b></span>
            </md-menu-item>
            <a href="#" @click="ProfileDialogue = true">
            <md-menu-item>
              <span><b>Profile</b></span>
            </md-menu-item>
            </a>

            <a href="/" @click="logout()"><md-menu-item>
              <span><b>Sign Out</b></span>
            </md-menu-item></a>
          </md-menu-content>
        </md-menu>
        <md-dialog-alert
          :md-active.sync="ProfileDialogue"
          :md-title="userName"
          md-content="Your <b>Profile</b> here!" />

        </div>
        

      </div>
    </div>
    <!--<div class="navbar-header">
      <a class="navbar-brand" href="#">SHOW ME</a>
    </div>-->

  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue'
import AuthenticationService from "../Auth/AuthService";
import VueMaterial from 'vue-material';
Vue.use(VueMaterial)


const auth = new AuthenticationService()
const {login, logout, authenticated, authNotifier} = auth

export default {
  data() {
    return {
      auth,
      ProfileDialogue: false,
      authenticated: false,
      userImage : "",
      userName : ""
    }
  },
  methods: {
    login,
    logout
  },
   mounted() {
    if(localStorage.getItem('userData')!=undefined){
      this.userImage = JSON.parse(localStorage.getItem('userData')).picture
      this.userName = JSON.parse(localStorage.getItem('userData')).given_name
      this.authenticated = localStorage.getItem('authorized')
      console.log("in navbar: "+JSON.parse(localStorage.getItem('userData')).given_name)

    }
    else{
      this.userImage = ""
    }
  }
};
</script>

<style>
.customNav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
}
.header{
      border-radius: 0px;
      width: 100%;
      height: 60px;
      background-color: #0E6390;

    }

#login{
      padding-top: 10px;
      padding-right: 20px;
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

input[type=text] {
    width: 150px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

input[type=text]:focus {
    width: 30%;
}

  .md-size-2x{
    margin-top: 0.3%;
    margin-left: 1%;
  }
</style>
