<template>
  <app-box v-bind:boxHeaderProp="researchAreasBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
    <ul class="list-group" v-if="categories && categories.length" style="height:100%; overflow-y:auto; overflow-x:hidden;">
      <li v-for="category in categories" class="list-group-item">
        <router-link :to="{ name:'allPapers',params:{areaid:category.id}}">{{ category.name }}</router-link>
        <span class="badge badge-primary badge-pill">{{ category.count }}</span>
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
      errors: []
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
