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
        <button type="button" class="btn btn-default btn-sm"  @click="login()">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-github"></i>
        </button>
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
import AuthenticationService from "../Auth/AuthService"

const auth = new AuthenticationService()
const {login, logout, authenticated, authNotifier} = auth

export default {
  data() {
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout    
  }
};
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
