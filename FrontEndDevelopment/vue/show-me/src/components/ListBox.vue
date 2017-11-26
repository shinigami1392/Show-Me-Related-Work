<template>
<app-box v-bind:boxHeaderProp = "researchAreasBoxHeader">
  <ul class="list-group" v-if="categories && categories.length" style="height:20%">
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
    .get(`http://localhost:8000/`)
    .then(response => {
      vm.categories = response.data.categories;
      console.log("cl: "+vm.categories.length);
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
  }
};
</script>


<style>

</style>
