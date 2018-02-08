<template>
  <div id="navigation" class="navbar navbar-default customNav">
    <div class="header">
      <div id="login">
        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-github"></i>
        </button>
        <a href="/">
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-home"></span> Home <i class="fas fa-home"></i>
          </button>
        </a>
      </div>
    </div>
    <div class="topnav" align="left">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
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
      border-radius: 3px;
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
    }

.topnav {
  width: 100%;
  padding-left: 3%;
  float: left;
  text-align: left;
  padding-top: 5px;
}



.topnav input[type=text] {
  font-size: 17px;
  border: 1;
  border-radius: 3px;
}

</style>
