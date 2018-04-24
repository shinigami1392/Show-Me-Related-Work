<template>

<div id="app" style="min-height:100vh;">
    <div id="foreground" style="min-height:100vh;">
        <!-- Fixed navbar -->
        <md-toolbar class="" style="background-color:#35342f;color:white">
            <span><md-button class="md-icon-button md-plain" @click="goToHome">
                <md-icon style="color:white">home</md-icon>
            </md-button></span>&emsp; 
            <span><md-button class="md-icon-button" @click="showNavigation = true">
                <md-icon style="color:white">notes</md-icon>
            </md-button></span>  
            <span class="md-title" style="color:white;cursor: pointer;" @click="showNavigation = true">Research Areas</span>

            <div class="md-toolbar-section-end">
                <md-button v-if="!userObjTemp.authorized" class="md-button" style="background-color:#35342f" @click="login()">
                    <span style="color:white">Sign In</span>&ensp;<md-icon style="color:white">person</md-icon>
                </md-button >
                <md-menu md-align-trigger v-if="userObjTemp.authorized">
                    <span class="md-subheading">
                        <b>Hi, {{userObjTemp.given_name}} {{userObjTemp.family_name}}</b>
                        <img :src="userObjTemp.picture" class="md-icon-button" md-menu-trigger>
                    </span>
                    <md-menu-content>
                        <a href="/" @click="logout()">
                            <md-menu-item>
                                <span>
                                    <b>Sign Out</b>
                                </span>
                            </md-menu-item>
                        </a>
                    </md-menu-content>
                </md-menu>
            </div>
        </md-toolbar>

        <!-- SideBar-->
        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">Research Areas</span>
            </md-toolbar>

            <md-list v-if="categories && categories.length">
                <md-list-item v-for="category in categories" :key="category.id">
                    <span class="md-list-item-text">
                        <router-link :to="{ name:'allPapers',params:{areaid:category.id}}">{{ category.name }}</router-link>
                    </span>
                    <span class="badge badge-primary badge-pill">{{ category.count }}</span>
                </md-list-item>
            </md-list>
        </md-drawer>

        <br/>
        <div id="main">
            <div class="container-fluid">
                <router-view class="col-md-12" name="aboutus"></router-view>
                <router-view class="col-md-12" name="contactus"></router-view>
                <div class="row content">
                    <div class="col-sm-6 col-sm-offset-3">
                        <router-view name="search-box"></router-view>
                    </div>
                    <div class="col-md-12" style="height:100%;">
                        <transition name="slide" mode="out-in">
                            <router-view name="animation-box"></router-view>
                        </transition>
                        <transition name="slide" mode="out-in">
                            <router-view name="table-box" :key="$route.fullPath"></router-view>
                        </transition>
                    </div>
                </div>
                <div class="row" style="margin-top:70px; margin-bottom:100px">
                    <div class="col-md-6">
                        <transition name="slide" mode="out-in">
                            <router-view name="info-box" :key="$route.fullPath"></router-view>
                            <router-view name="feedback-box" :key="$route.fullPath"></router-view>
                        </transition>
                    </div>
                    <div class="col-md-6">
                        <transition name="slide" mode="out-in">
                            <router-view name="link-info-box" :key="$route.fullPath"></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <!--Footer-->
        <footer>
            <app-footer></app-footer>
        </footer>
    </div>
</div>



</template>

<script>

import axios from "axios";
import Vue from 'vue'
import AuthenticationService from "./Auth/AuthService";
import VueMaterial from 'vue-material';
Vue.use(VueMaterial)

const auth = new AuthenticationService()
const {login, logout} = auth

function getPaperCatagories(vm) {
  axios
    .get(`http://54.201.123.246:8081/domains/all`)
    .then(response => {
      vm.categories = response.data.domains;
      console.log(JSON.stringify(vm.categories));
      vm.$store.commit('setDomains',  vm.categories);
    })
    .catch(err => {
      vm.errors.push(err);
    });
}



function getUserData(vm,token) {
    if(localStorage.getItem('userData') !="" && localStorage.getItem('userData') != undefined && localStorage.getItem('userData') != null){
        let userObjTemp = JSON.parse(localStorage.getItem('userData'));
        vm.createPayloadAndCommit(userObjTemp);
  }
  else{
    axios
      .get(`https://pushkar-showme.auth0.com/userinfo`,{headers: { Authorization: "Bearer " + token }})
      .then(response => {
          let userData = JSON.stringify(response.data);
          //console.log(JSON.stringify(response.data));
          localStorage.setItem('userData', userData);
          let userObjTemp = JSON.parse(localStorage.getItem('userData'));
          axios.post('http://localhost:8081/users/user', {
              userId: response.data.sub,
              first_name: response.data.given_name,
              last_name: response.data.family_name,
              email: response.data.email
            }).then(function (response) {
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
          vm.createPayloadAndCommit(userObjTemp);
          vm.$router.push('home');
      })
      .catch(err => {
        console.log(err);
        vm.errors.push(err);
      });
  }


}

  



export default {
  name: "app",
  data() {
    return {
        showNavigation: false,
        showSidepanel: false,
        flag: false,
        categories: [],
      errors : [],
      userName:'',
      userObjTemp: this.$store.state.userObjStore,
      ProfileDialogue: false,
      userFeedbackBoxHeader: "Comment and Vote"
    };
  },
  methods: {
    login,
    logout,
    goToHome : function(){
        this.$router.push({
            name: 'home'
        });
    },
    createPayloadAndCommit : function(userObjTemp){
        let payload = {};
        payload.given_name= userObjTemp.given_name;
        payload.family_name= userObjTemp.family_name;
        payload.email= userObjTemp.email;
        payload.userid= userObjTemp.sub;
        payload.picture= userObjTemp.picture;
        payload.authorized= true;
        this.$store.commit('setAuthorization',  payload);
    }

  },
  mounted() {
      var path = JSON.stringify(this.$route.fullPath);
      if (path.length > 5 ) {
        var token =   path.split("&")[0].split("=")[1];
        getUserData(this, token)
      }
  },
  created(){
          getPaperCatagories(this);
    if (localStorage.getItem('userData')!="" && localStorage.getItem('userData')!= undefined && localStorage.getItem('userData')!= null){
          let userObjTemp = JSON.parse(localStorage.getItem("userData"));
          this.createPayloadAndCommit(userObjTemp);
    }
  }
};
</script>

<style>
    body {
        width: 100%;
        background-color: #dddddd
    }

    .slide-leave-active {
        transition: opacity 0.2s ease;
        opacity: 0;
        animation: slide-out 0.2s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in 0.2s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .container-fluid {
        padding-left: 150px;
        padding-right: 150px;
    }

    .md-drawer {
        width: 267px;
        max-width: calc(100vw - 225px);
    }

    .md-content {
        padding: 16px;
    }
</style>
