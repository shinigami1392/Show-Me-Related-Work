<template>
  <div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
      <!--<div id="logoDiv">
        <a href="/"><img src="../assets/ShowMe3.png" id="logo"></a>
      </div>-->

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
      height: 50px;
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

.searchButton {

  text-align: center;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}
</style>
