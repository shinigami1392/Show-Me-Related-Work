<template>
  <div id="navigation" class="navbar navbar-default customNav">

    <div class="navbar-header">
      <!-- <a class="navbar-brand" href="#">SHOW ME</a>-->
    </div>

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
</style>
