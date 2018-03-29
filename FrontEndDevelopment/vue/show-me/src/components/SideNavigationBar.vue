<template>
	<app-box v-bind:boxHeaderProp="researchAreasBoxHeader" v-bind:cardStyle="cardStyle" v-on:click.native="flag = true">
		<div v-if="flag" id="mySidenav" v-bind:cardBlockStyle="cardBlockStyle">
			<div v-on:click.native="flag = false" >×</div>
			<a href="#">About</a>
			<a href="#">Services</a>
			<a href="#">Clients</a>
			<a href="#">Contact</a>
		</div>
	</app-box>
	
</template>

<script>
import axios from "axios";
function getPaperCatagories(vm) {
  axios
    .get(`http://54.201.123.246:8081/domains/all`)
    .then(response => {
      vm.categories = response.data.domains;
    })
    .catch(err => {
      vm.errors.push(err);
    });
}

export default {
  data() {
    return {
      researchAreasBoxHeader: "Research Areas",
	  flag: false,
      categories: [],
      errors: [],
      testcategories: [{'id':1,'name':'software engineering'},{'id':2,'name':'machine learning'},{'id':3,'name':'web development'}]
    };
  },
  methods: {
	openNav: function () {
		mySidenav = document.getElementById('mySidenav');
		mySidenav.style.width="250px";
    },

    closeNav: function () {
    let sideBarElement = "sideBar";
      let close = document.getElementById(sideBarElement); 
      close.style.width = "0px";
    }
  },
  created() {
    getPaperCatagories(this);
    this.cardStyle = "writing-mode:tb-rl;height:100%;float:right;cursor:pointer";
    this.cardBlockStyle = "height:90%;position:absolute;overflow-x:hidden;top:0;right:25px;font-size:36px;margin-left:50px";
    this.cardBlockContentStyle = "height:100%;"
  }
};
</script>
<style>
</style>