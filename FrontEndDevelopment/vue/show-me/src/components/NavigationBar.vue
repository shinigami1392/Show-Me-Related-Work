<template>
  <div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
      <div id="login">
        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-github"></i>
        </button>
        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Home <i class="fas fa-home"></i>
        </button>
      </div>
    </div>
    <!--<div class="navbar-header">
      <a class="navbar-brand" href="#">SHOW ME</a>
    </div>-->

  </div>
</template>

<script>
import axios from "axios";

function sendLoginRequest() { }
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
        email: "johndoe2020@gmail.com"
      }
    };
  }
};
</script>

<style>
.customNav {
  background: -webkit-radial-gradient(circle, #fff, #fff);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header{
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
      text-align: right;
    }
</style>
