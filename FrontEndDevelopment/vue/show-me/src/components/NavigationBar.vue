<template>
<div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
        <a href="/">
            <img width="60" height="60" hspace="20" src="./LogoMakr_9i2uuu.png" />
        </a>
        <div id="login">
            <button type="button" v-if="!userObjTemp.authorized" class="btn btn-default btn-sm" @click="login()">
                <span class="glyphicon glyphicon-home"></span> Sign In
                <i class="fas fa-sign-in-alt"></i>
            </button>
            <md-menu md-align-trigger v-if="userObjTemp.authorized">
                <img :src="userObjTemp.picture" class="md-icon-button" md-menu-trigger>
                <md-tooltip md-direction="bottom">{{userObjTemp.given_name}}</md-tooltip>
                <md-menu-content>
                    <md-menu-item>
                        <span>
                            <b>Hi, {{userObjTemp.given_name}}</b>
                        </span>
                    </md-menu-item>
                    <a href="#" @click="ProfileDialogue = true">
                        <md-menu-item>
                            <span>
                                <b>Profile</b>
                            </span>
                        </md-menu-item>
                    </a>
                    <a href="/" @click="logout()">
                        <md-menu-item>
                            <span>
                                <b>Sign Out</b>
                            </span>
                        </md-menu-item>
                    </a>
                </md-menu-content>
            </md-menu>
            <md-dialog-alert :md-active.sync="ProfileDialogue" :md-title="userName" md-content="<h6>First Name:</h6> </br><h6>Last Name:</h6></br><h6>Email:</h6>"
            />
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Vue from 'vue'
import AuthenticationService from "../Auth/AuthService";
import VueMaterial from 'vue-material';
Vue.use(VueMaterial)


const auth = new AuthenticationService()
const {login, logout} = auth

export default {
  data() {
    return {
      userName:'',
      userObjTemp: this.$store.state.userObjStore,
      ProfileDialogue: false,
    }
  },
  methods: {
    login,
    logout,
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
