<template>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">

  <a class="navbar-brand" href="#">Show-ME</a>
  <ul class="navbar-nav">
    <li v-if="isLoggedIn" class="nav-item">
        <a class="nav-link" href="#">Welcome {{userInfo.firstname}}</a>
    </li>
    <form class="form-inline" v-if="isLoggedIn">
        <button class="btn btn-outline-success" type="button">Logout</button>
    </form>
  </ul>
    <form class="form-inline" v-if="!isLoggedIn">
        <button class="btn btn-outline-success" type="button">Login With Google</button>
    </form>
</nav>


</template>

<script>
import axios from "axios";

function sendLoginRequest() {}
function sendLogoutRequest() {}

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

</style>
