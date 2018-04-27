<template>

<div id="app">
    <div id="foreground">
        <!-- Fixed navbar -->
        <md-toolbar style="background-color:#35342f;color:#fff">
            <span><md-button class="md-icon-button md-plain" @click="goToHome">
                <md-icon style="color:#fff">home</md-icon>
            </md-button></span>&emsp; 
            <span><md-button class="md-icon-button" @click="showNavigation = true">
                <md-icon style="color:#fff">subject</md-icon>
            </md-button></span>  
            <span id="researchPtr" class="md-title" @click="showNavigation = true">Research Domains</span>

            <div class="md-toolbar-section-end">
                <md-button v-if="!userObjTemp.authorized" class="md-button" style="background-color:#35342f" @click="getLastURlBeforeLogin()">
                    <span style="background-color:#35342f;color:#fff">Sign In</span>&ensp;<md-icon style="background-color:#35342f;color:#fff">touch_app</md-icon>
                </md-button >
                <md-menu md-align-trigger v-if="userObjTemp.authorized">
                    <span class="md-subheading">
                        Hi, {{userObjTemp.given_name}} {{userObjTemp.family_name}}
                        <img :src="userObjTemp.picture" class="md-icon-button" md-menu-trigger>
                    </span>
                    <md-menu-content>
                        <md-menu-item href="/" @click="logout()">Sign Out</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </div>
        </md-toolbar>

        <!-- SideBar-->
        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar md-elevation="2">
                <span class="md-title">Research Domains</span>
            </md-toolbar>

            <md-list v-if="categories && categories.length">
                <md-list-item v-for="category in categories" :key="category.id">
                    <span class="md-list-item-text md-subheading">
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
                <div class="row" style="margin-top:60px;margin-bottom:100px">
                    <div class="col-md-12">
                        <transition name="slide" mode="out-in">
                            <router-view name="info-box" :key="$route.fullPath"></router-view>
                            <router-view name="feedback-box" :key="$route.fullPath"></router-view>
                        </transition>
                    </div>
                    <!--<div class="col-md-6">
                        <transition name="slide" mode="out-in">
                            <router-view name="link-info-box" :key="$route.fullPath"></router-view>
                        </transition>
                    </div>-->
                </div>
            </div>
        </div>

        <!--Footer-->
        <footer class="md-subheading">
            <app-footer style="bottom:0;"></app-footer>
        </footer>
    </div>
</div>



</template>

<script>
  import axios from "axios";
  import AuthenticationService from "./Auth/AuthService";


  const auth = new AuthenticationService()
  const {
    login,
    logout
  } = auth

  function getPaperCatagories(vm) {
    axios
      .get(`http://54.201.123.246:8081/domains/all`)
      .then(response => {
        vm.categories = response.data.domains;
       // console.log(JSON.stringify(vm.categories));
        vm.$store.commit('setDomains', vm.categories);
      })
      .catch(err => {
        vm.errors.push(err);
      });
  }



  function getUserData(vm, token) {
    if (localStorage.getItem('userData') != "" && localStorage.getItem('userData') != undefined && localStorage.getItem(
        'userData') != null) {
      let userObjTemp = JSON.parse(localStorage.getItem('userData'));
      vm.createPayloadAndCommit(userObjTemp);
    } else {
      axios
        .get(`https://pushkar-showme.auth0.com/userinfo`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
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
          var lastURL = sessionStorage.getItem('lastVisitedURL');
          vm.$router.push(lastURL);
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
        categories: [],
        errors: [],
        userObjTemp: this.$store.state.userObjStore,
      };
    },
    methods: {
      login,
      logout,
      goToHome: function () {
        this.$router.push({
          name: 'home'
        });
      },
      getLastURlBeforeLogin: function() {
          var lastURL = this.$route.fullPath;                   
          sessionStorage.setItem('lastVisitedURL', lastURL);
          login();
      },
      createPayloadAndCommit: function (userObjTemp) {
        let payload = {};
        payload.given_name = userObjTemp.given_name;
        payload.family_name = userObjTemp.family_name;
        payload.email = userObjTemp.email;
        payload.userid = userObjTemp.sub;
        payload.picture = userObjTemp.picture;
        payload.authorized = true;
        this.$store.commit('setAuthorization', payload);
      }
    },
    mounted() {
      var path = JSON.stringify(this.$route.fullPath);
      if (path.length > 5) {
        var token = path.split("&")[0].split("=")[1];
        getUserData(this, token)
      }
    },
    created() {
      getPaperCatagories(this);
      if (localStorage.getItem('userData') != "" && localStorage.getItem('userData') != undefined && localStorage.getItem(
          'userData') != null) {
        let userObjTemp = JSON.parse(localStorage.getItem("userData"));
        this.createPayloadAndCommit(userObjTemp);
      }
    }
  };

</script>



<style>
    html,
    body {
        margin:0;
        padding:0;
        height:100%;
        background-color:#e1e0dd !important;
    }

    #main{
        height:auto !important;
        min-height:100%;
        margin-left:200px;
        margin-right:200px;
    }

    .slide-leave-active {
        transition: opacity 0.1s ease;
        opacity: 0;
        animation: slide-out 0.1s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in 0.1s ease-out forwards;
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

    /*.container-fluid {
        min-height:100%;;
        padding-left: 200px;
        padding-right: 200px;
    }*/

    .md-drawer {
        width: 300px;
    }

    #researchPtr{
        color:white;
        cursor:pointer;
    }  
</style>
