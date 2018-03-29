<template>
	<div>
		<app-box v-bind:boxHeaderProp="researchAreasBoxHeader" v-bind:cardStyle="cardStyle" v-on:click.native="openNav">
		</app-box>	
		<div id="sideBar" v-bind:cardBlockStyle="cardBlockStyle">
			<a href="javascript:void(0)">×</a>
			<a href="#">About</a>
			<a href="#">Services</a>
			<a href="#">Clients</a>
			<a href="#">Contact</a>
		</div>	
	</div>
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
	openNav: function(event){
		open = document.getElementById("sideBar");
		open.style.width = "250px";
	}
  },
  created() {
    getPaperCatagories(this);
    this.cardStyle = "writing-mode:tb-rl;height:100%;float:right;cursor:pointer";
    this.cardBlockStyle = "";
    this.cardBlockContentStyle = "height:100%;"
  }
};
</script>
<style>
</style>