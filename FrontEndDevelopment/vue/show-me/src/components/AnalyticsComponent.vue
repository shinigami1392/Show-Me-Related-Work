<template>
  <div id="feeds">
    <div id="mostCommented">
      <span> The most commented Relation: </span>
    </div>
    <div id="mostUpVoted">
      <span> The most UpVoted Relation: </span>
    </div>
    <div id="mostRecentlyCommented">
      <span> The most commented Relation: </span>
    </div>
    <div id="mostRecentlyUpVoted">
      <span> The most UpVoted Relation: </span>
    </div>

  </div>
</template>

<script>
import axios from "axios";

function getMostCommented() { }
function getMostUpvoted() { }
function getMostRecentlyCommented() { }
function getMostRecentlyUpvoted() { }


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
