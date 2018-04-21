<template>
<div id="app" style="min-height:100vh;">
    <div id="foreground" style="min-height:100vh;">
        <!-- Fixed navbar -->
        <div>
            <app-navbar>
            </app-navbar>
        </div>

        <!--  Main -->
        <div id="main">
            <div class="container-fluid">
                <router-view class="col-md-12" name="aboutus"></router-view>
                <router-view class="col-md-12" name="contactus"></router-view>
                <div class="row content">
                    <div class="col-sm-6 col-sm-offset-2">
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


                <div class="row" style="margin-top:70px; margin-bottom:70px">
                    <div class="col-md-6">
                        <transition name="slide" mode="out-in">
                            <router-view name="info-box" :key="$route.fullPath"></router-view>
                            <router-view name="feedback-box" :key="$route.fullPath" :userData="userObj"></router-view>
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
          localStorage.setItem('userData', userData);
          let userObjTemp = JSON.parse(localStorage.getItem('userData'));
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
      errors : [],
      userFeedbackBoxHeader: "Comment and Vote"
    };
  },
  methods: {

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

    if (localStorage.getItem('userData')!="" && localStorage.getItem('userData')!= undefined && localStorage.getItem('userData')!= null){
          let userObjTemp = JSON.parse(localStorage.getItem("userData"));
          this.createPayloadAndCommit(userObjTemp);
    }
  }
};
</script>

<style>
body{
  width: 100%;
  background-image: url(circuits2.jpg);
} 

#foreground{
  background-color:rgba(0, 0, 0, 0.5);
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
