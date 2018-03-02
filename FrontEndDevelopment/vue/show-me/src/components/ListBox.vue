<template>
  <app-box v-bind:boxHeaderProp="researchAreasBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
    <ul class="list-group" v-if="categories && categories.length" style="height:100%; overflow-y:auto; overflow-x:hidden;">
      <li v-for="category in categories" class="list-group-item">
        <router-link :to="{ name:'allPapers',params:{areaid:category.id}}">{{ category.name }}</router-link>
        <span class="badge badge-primary badge-pill">{{ category.count }}</span>
      </li>
    </ul>

  <!-- TEST-->
    <ul class="list-group">
      <li v-for="cat in testcategories" class="list-group-item">
        {{ cat.name }}
      </li>
    </ul>
  


  </app-box>
</template>

<script>
import axios from "axios";

function getPaperCatagories(vm) {
  axios
    .get(`http://localhost:8081/domains/all`)
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
      testcategories: [{'id':1,'name':'Mining and Learning with Graphs and Relations'},
                      {'id':2,'name':'Machine Learning for Computer Security'},
                      {'id':3,'name':'In Memory of Alexey Chervonenkis'},
                      {'id':4,'name':'Probabilistic Models of Link Structure'},
                      {'id':5,'name':'Multiple Instance Learning'},
                      {'id':6,'name':'Fast Signal Processing'},
                      {'id':7,'name':'Software Engineering'}]
    };
  },

  methods: {
  },

  created() {
    getPaperCatagories(this);
    this.cardStyle = "height:100%";
    this.cardBlockStyle = "height:90%;"
    this.cardBlockContentStyle = "height:100%;"
  }
};
</script>


<style>
.header{
  background-color: #343a40;
}
</style>
