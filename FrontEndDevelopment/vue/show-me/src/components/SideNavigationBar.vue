<template>
	<app-box v-bind:boxHeaderProp="researchAreasBoxHeader" v-bind:cardStyle="cardStyle" v-on:click="areas">
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
      categories: [],
      errors: [],
      testcategories: [{'id':1,'name':'software engineering'},{'id':2,'name':'machine learning'},{'id':3,'name':'web development'}]
    };
  },
  methods: {
	areas: function(event) {
      alert('Hello!!')
	}
  },
  created() {
    getPaperCatagories(this);
    this.cardStyle = "writing-mode:tb-rl;height:100%;float:right;cursor:pointer";
    this.cardBlockStyle = "height:90%;"
    this.cardBlockContentStyle = "height:100%;"
  }
};
</script>
<style>
</style>