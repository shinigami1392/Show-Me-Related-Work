<template>
<div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
        <a href="/">
            <img width="50" height="40" hspace="20" src="../assets/images/logoHeader.png" />
        </a>
        <div id="login">
            <button type="button" v-if="!userObjTemp.authorized" class="btn btn-default btn-sm" @click="login()">
                <span class="glyphicon glyphicon-home"></span> Sign In
                <i class="fas fa-sign-in-alt"></i>
            </button>
            <md-menu md-align-trigger v-if="userObjTemp.authorized">
                <span>
                    <b>Hi, {{userObjTemp.given_name}} {{userObjTemp.family_name}}</b>
                </span>
                <img :src="userObjTemp.picture" class="md-icon-button" md-menu-trigger>
                <md-tooltip md-direction="bottom">{{userObjTemp.given_name}}</md-tooltip>
                <md-menu-content>
                    
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
  color: #fff;
}
.header{
      border-radius: 0px;
      width: 100%;
      height: 50px;
      background-color: #35342f
}

#login{
      padding-top: 5px;
      padding-right: 20px;
      padding-left: 10px;
      text-align: right;
      float: right;
    }

.topnav {
  width: 50%;
  padding-left: 1%;
  float: left;
  text-align: left;
  padding-top: 9px;
}

.md-size-2x{
    margin-top: 0.3%;
    margin-left: 1%;
}
</style>
