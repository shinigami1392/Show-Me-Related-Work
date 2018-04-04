<template>
  <div id="app">
    <!-- Fixed navbar -->
    <div>
      <app-navbar :userData="userObj">
      </app-navbar>
    </div>

    <!--  Main -->
    <div id="main">
      <div class="container-fluid" style="height:700px">
        <div class="row content" style="height:60%;">
          <div class="col-md-12">
            <router-view name="search-box"></router-view>
          </div>
          <div class="col-md-11" style="height:100%;">
            <transition name="slide" mode="out-in">
              <router-view name="animation-box"></router-view>
            </transition>

            <transition name="slide" mode="out-in">
              <router-view name="table-box" :key="$route.fullPath"></router-view>
            </transition>
          </div>
          <div class="col-md-1" style="height:100%;">
            <router-view name="area-box"></router-view>
          </div>
        </div>



        <div class="row" style="height:70%; margin-top:5px;">
          <div class="col-md-6" style="height:50%">
														<!--<app-box v-bind:boxHeaderProp = "userFeedbackBoxHeader">
																		  </app-box> -->
            <transition name="slide" mode="out-in">
			  <router-view name="info-box" :key="$route.fullPath"></router-view>
              <router-view name="feedback-box" :key="$route.fullPath"></router-view>
            </transition>
          </div>
		  <div class="col-md-6" style="height:50%;">
            <transition name="slide" mode="out-in">
			  <router-view name="link-info-box" :key="$route.fullPath"></router-view>
            </transition>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

function getUserData(vm,token) {
  axios
    .get(`https://pushkar-showme.auth0.com/userinfo`,{headers: { Authorization: "Bearer " + token }})
    .then(response => {
      vm.userData = JSON.stringify(response.data);
      //console.log(typeof response.data)
      //console.log("user data: "+ vm.userData);
      if (localStorage.getItem('userData')!="" || localStorage.getItem('userData')!= undefined){
        //TODO: an API call to user API of ShowMe backend Server
        //TODO: check if the user exist, if yes populate the user data else populate the user data and also store it at backend
        localStorage.setItem('userData', vm.userData)
        localStorage.setItem('authorized', true)
        console.log("data in local storage")
        console.log(localStorage.getItem('userData'))
      }
      else{

      }
    })
    .catch(err => {
      vm.errors.push(err);
    });
}



export default {
  name: "app",
  data() {
    return {
      userObj:{
        userImage : "",
        userName : "",
        authenticated: false,
      },
      userFeedbackBoxHeader: "Comment and Vote"
    };
  },
  mounted() {
      var path = JSON.stringify(this.$route.fullPath);

      if (path.length > 5 ) {
        var token =   path.split("&")[0].split("=")[1];
        getUserData(this, token)
      }

      if(localStorage.getItem('userData')!=undefined){
        this.userObj.userImage = JSON.parse(localStorage.getItem('userData')).picture
        this.userObj.userName = JSON.parse(localStorage.getItem('userData')).given_name
        this.userObj.authenticated = localStorage.getItem('authorized')
        console.log("in navbar: "+JSON.parse(localStorage.getItem('userData')).given_name)
      }
      else{
        this.userObj.userImage = ""
      }

  }
};
</script>

<style>
#app{
  width: 100%;
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
</style>
